import { useState, useEffect, useCallback } from "react";
import { db } from "./Firebase";
import { ref, onValue, push, remove, update } from "firebase/database";

export default function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const goalsRef = ref(db, "goals");
    const unsubscribe = onValue(
      goalsRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          // pendientes primero, y dentro de cada grupo las más nuevas arriba
          .sort((a, b) => {
            if (!!a.cumplido !== !!b.cumplido) return a.cumplido ? 1 : -1;
            return (b.timestamp || 0) - (a.timestamp || 0);
          });
        setGoals(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error leyendo metas:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const addGoal = useCallback(async (titulo, descripcion) => {
    if (!titulo?.trim()) throw new Error("Falta el título");
    await push(ref(db, "goals"), {
      titulo: titulo.trim(),
      descripcion: (descripcion || "").trim(),
      cumplido: false,
      timestamp: Date.now(),
    });
  }, []);

  const toggleGoal = useCallback(async (id, cumplido) => {
    await update(ref(db, `goals/${id}`), { cumplido: !cumplido });
  }, []);

  const deleteGoal = useCallback(async (id) => {
    await remove(ref(db, `goals/${id}`));
  }, []);

  return { goals, addGoal, toggleGoal, deleteGoal, loading };
}
