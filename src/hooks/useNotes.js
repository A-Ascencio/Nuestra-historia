import { useState, useEffect, useCallback } from "react";
import { db } from "./Firebase";
import { ref, onValue, push, set, serverTimestamp } from "firebase/database";
import compressImage from "../utils/compressImage";

export default function useNotes(me) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastSeen, setLastSeen] = useState(0);
  const [seenLoaded, setSeenLoaded] = useState(false);

  // Todas las notitas
  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, "notes"),
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setNotes(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error leyendo notitas:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  // Hasta cuándo ha visto notitas ESTA persona (se guarda en Firebase,
  // así no vuelve a salir aunque abra la app desde otro dispositivo)
  useEffect(() => {
    if (!me) return;
    const unsubscribe = onValue(
      ref(db, `notesSeen/${me}`),
      (snapshot) => {
        setLastSeen(snapshot.val() || 0);
        setSeenLoaded(true);
      },
      (error) => {
        console.error("Error leyendo notitas vistas:", error);
        setSeenLoaded(true);
      },
    );
    return () => unsubscribe();
  }, [me]);

  const addNote = useCallback(
    async (file, titulo, descripcion) => {
      if (!titulo?.trim()) throw new Error("Falta el título");
      const now = new Date();

      const nueva = {
        autor: me,
        titulo: titulo.trim(),
        descripcion: (descripcion || "").trim(),
        foto: file ? await compressImage(file, 1024, 0.7) : "",
        fecha: now.toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        hora: now.toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        // Hora del servidor: evita problemas si los relojes de los
        // dos celulares no coinciden
        timestamp: serverTimestamp(),
      };

      await push(ref(db, "notes"), nueva);
    },
    [me],
  );

  const markSeen = useCallback(
    async (timestamp) => {
      if (!me || !timestamp) return;
      await set(ref(db, `notesSeen/${me}`), timestamp);
    },
    [me],
  );

  return { notes, loading, lastSeen, seenLoaded, addNote, markSeen };
}
