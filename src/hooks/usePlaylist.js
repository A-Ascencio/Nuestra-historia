import { useState, useEffect, useCallback } from "react";
import { db } from "./Firebase";
import { ref, onValue, push, remove } from "firebase/database";

export const MAX_SONGS = 10;

// Acepta "youtube.com/..." o "https://..." y devuelve una URL segura.
// Solo permite http/https para evitar enlaces raros tipo "javascript:".
export function normalizeLink(raw) {
  const value = (raw || "").trim();
  if (!value) return "";
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null; // inválido
  }
}

export default function usePlaylist() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const songsRef = ref(db, "playlist");
    const unsubscribe = onValue(
      songsRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        setSongs(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error leyendo playlist:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const addSong = useCallback(
    async (titulo, descripcion, link) => {
      if (!titulo?.trim()) throw new Error("Falta el título");
      if (songs.length >= MAX_SONGS) throw new Error("Playlist llena");

      const cleanLink = normalizeLink(link);
      if (cleanLink === null) throw new Error("Link inválido");

      await push(ref(db, "playlist"), {
        titulo: titulo.trim(),
        descripcion: (descripcion || "").trim(),
        link: cleanLink,
        timestamp: Date.now(),
      });
    },
    [songs.length],
  );

  const deleteSong = useCallback(async (id) => {
    await remove(ref(db, `playlist/${id}`));
  }, []);

  return { songs, addSong, deleteSong, loading };
}
