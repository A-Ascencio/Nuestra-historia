import { useState, useEffect, useCallback } from "react";
import { db } from "./Firebase";
import { ref, onValue, push, remove } from "firebase/database";
import compressImage from "../utils/compressImage";

export default function useMemories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const memoriesRef = ref(db, "memories");
    const unsubscribe = onValue(
      memoriesRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setMemories(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error leyendo recuerdos:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const addMemory = useCallback(async (file, descripcion) => {
    if (!file) throw new Error("Falta la foto");
    const foto = await compressImage(file);
    const now = new Date();

    const nuevo = {
      foto,
      descripcion: descripcion || "",
      fecha: now.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      hora: now.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: now.getTime(),
    };

    await push(ref(db, "memories"), nuevo);
  }, []);

  const deleteMemory = useCallback(async (id) => {
    await remove(ref(db, `memories/${id}`));
  }, []);

  return { memories, addMemory, deleteMemory, loading };
}
