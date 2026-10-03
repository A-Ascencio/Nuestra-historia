import { useState, useRef } from "react";
import Modal from "../components/Modal";
import useMemories from "../hooks/useMemories";
import { Camera } from "lucide-react";

export default function Recuerdos({ open, onClose }) {
  const { memories, addMemory, deleteMemory } = useMemories();
  const [view, setView] = useState("gallery"); // gallery | viewer | add
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const resetAddForm = () => {
    setDescripcion("");
    setPreview(null);
    setFile(null);
  };

  const handleClose = () => {
    setView("gallery");
    resetAddForm();
    onClose();
  };

  const openViewer = (index) => {
    setSelectedIndex(index);
    setView("viewer");
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    if (!file) return;
    setSaving(true);
    try {
      await addMemory(file, descripcion.trim());
      resetAddForm();
      setView("gallery");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    deleteMemory(id);
    setView("gallery");
  };

  const title =
    view === "add"
      ? "Nuevo recuerdo"
      : view === "viewer"
        ? "Recuerdo"
        : "Nuestros recuerdos";

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      {view === "gallery" && (
        <>
          <button
            onClick={() => setView("add")}
            className="btn-primary"
            style={{ width: "100%", fontSize: 13, marginBottom: 16 }}
          >
            + Agregar recuerdo
          </button>

          {memories.length === 0 ? (
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              Aún no hay recuerdos guardados. ¡Agrega el primero!
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {memories.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => openViewer(i)}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background: "var(--tag-bg)",
                  }}
                >
                  <img
                    src={m.foto}
                    alt={m.descripcion || "Recuerdo"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {view === "viewer" && memories[selectedIndex] && (
        <div>
          <img
            src={memories[selectedIndex].foto}
            alt={memories[selectedIndex].descripcion || "Recuerdo"}
            style={{
              width: "100%",
              borderRadius: 12,
              display: "block",
              marginBottom: 12,
              maxHeight: "45vh",
              objectFit: "contain",
              background: "var(--tag-bg)",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <button
              onClick={() =>
                setSelectedIndex(
                  (i) => (i - 1 + memories.length) % memories.length,
                )
              }
              disabled={memories.length < 2}
              aria-label="Anterior"
              style={{
                background: "var(--tag-bg)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: memories.length < 2 ? "default" : "pointer",
                opacity: memories.length < 2 ? 0.4 : 1,
                fontSize: 16,
              }}
            >
              ‹
            </button>
            <p
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              {memories[selectedIndex].fecha} · {memories[selectedIndex].hora}
            </p>
            <button
              onClick={() => setSelectedIndex((i) => (i + 1) % memories.length)}
              disabled={memories.length < 2}
              aria-label="Siguiente"
              style={{
                background: "var(--tag-bg)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: memories.length < 2 ? "default" : "pointer",
                opacity: memories.length < 2 ? 0.4 : 1,
                fontSize: 16,
              }}
            >
              ›
            </button>
          </div>

          {memories[selectedIndex].descripcion && (
            <p
              style={{
                fontSize: 13,
                color: "var(--text-sub)",
                fontFamily: "var(--font-body)",
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              {memories[selectedIndex].descripcion}
            </p>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => setView("gallery")}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-main)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Volver
            </button>
            <button
              onClick={() => handleDelete(memories[selectedIndex].id)}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: 10,
                border: "1px solid #f4678a",
                background: "transparent",
                color: "#f4678a",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Borrar
            </button>
          </div>
        </div>
      )}

      {view === "add" && (
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: "100%",
              aspectRatio: "4/3",
              borderRadius: 12,
              border: "1.5px dashed var(--tag-border)",
              background: "var(--tag-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginBottom: 14,
              overflow: "hidden",
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  textAlign: "center",
                  padding: "0 16px",
                }}
              >
                Toca para elegir una foto
              </p>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
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
            Descripción
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Cuenta qué pasó en este momento..."
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

          <p
            style={{
              fontSize: 10,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
              marginBottom: 16,
            }}
          >
            La fecha y hora se guardan automáticamente al momento de subir la
            foto.
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                resetAddForm();
                setView("gallery");
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
              disabled={!file || saving}
              className="btn-primary"
              style={{
                flex: 1,
                fontSize: 13,
                opacity: !file || saving ? 0.6 : 1,
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
