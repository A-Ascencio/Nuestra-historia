import { useState } from "react";
import Modal from "../components/Modal";
import useGoals from "../hooks/useGoals";
import { Trash2 } from "lucide-react";

export default function Metas({ open, onClose }) {
  const { goals, addGoal, toggleGoal, deleteGoal, loading } = useGoals();
  const [view, setView] = useState("list"); // list | add
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [saving, setSaving] = useState(false);

  const cumplidas = goals.filter((g) => g.cumplido).length;

  const resetForm = () => {
    setTitulo("");
    setDescripcion("");
  };

  const handleClose = () => {
    setView("list");
    resetForm();
    onClose();
  };

  const handleSave = async () => {
    if (!titulo.trim()) return;
    setSaving(true);
    try {
      await addGoal(titulo, descripcion);
      resetForm();
      setView("list");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (g) => {
    if (window.confirm(`¿Borrar la meta "${g.titulo}"?`)) {
      deleteGoal(g.id);
    }
  };

  const title = view === "add" ? "Nueva meta" : "Nuestras metas";

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      {view === "list" && (
        <>
          <button
            onClick={() => setView("add")}
            className="btn-primary"
            style={{ width: "100%", fontSize: 13, marginBottom: 16 }}
          >
            + Agregar meta
          </button>

          {goals.length > 0 && (
            <p
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {cumplidas} de {goals.length} cumplidas :3
            </p>
          )}

          {loading ? (
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              Cargando...
            </p>
          ) : goals.length === 0 ? (
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              Aún no hay metas. ¡Agreguen la primera juntos!
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {goals.map((g) => (
                <div
                  key={g.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    background: g.cumplido ? "var(--tag-bg)" : "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "12px 14px",
                    opacity: g.cumplido ? 0.75 : 1,
                    transition: "opacity 0.2s, background 0.2s",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!g.cumplido}
                    onChange={() => toggleGoal(g.id, g.cumplido)}
                    aria-label={`Marcar "${g.titulo}" como cumplida`}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 1,
                      cursor: "pointer",
                      accentColor: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "var(--font-body)",
                        color: "var(--text-main)",
                        textDecoration: g.cumplido ? "line-through" : "none",
                        wordBreak: "break-word",
                      }}
                    >
                      {g.titulo}
                    </p>
                    {g.descripcion && (
                      <p
                        style={{
                          fontSize: 12,
                          fontFamily: "var(--font-body)",
                          color: "var(--text-sub)",
                          marginTop: 3,
                          lineHeight: 1.5,
                          wordBreak: "break-word",
                        }}
                      >
                        {g.descripcion}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(g)}
                    aria-label={`Borrar meta "${g.titulo}"`}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 16,
                      color: "#f4678a",
                      padding: 2,
                      flexShrink: 0,
                    }}
                  >
                    <Trash2 size={16} strokeWidth={1.75} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {view === "add" && (
        <div>
          <label
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Título
          </label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Viajar a la playa juntos"
            maxLength={80}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-main)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              marginBottom: 14,
            }}
          />

          <label
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Descripción (opcional)
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Cuenta de qué trata esta meta..."
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-main)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              resize: "vertical",
              marginBottom: 16,
            }}
          />

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                resetForm();
                setView("list");
              }}
              style={{
                flex: 1,
                padding: "11px 0",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-main)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!titulo.trim() || saving}
              className="btn-primary"
              style={{
                flex: 1,
                fontSize: 13,
                opacity: !titulo.trim() || saving ? 0.6 : 1,
              }}
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
