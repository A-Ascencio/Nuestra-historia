import { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import useNotes from "../hooks/useNotes";
import { Camera } from "lucide-react";

const labelStyle = {
  fontSize: 10,
  color: "var(--text-muted)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: "var(--font-body)",
  display: "block",
  marginBottom: 6,
};

const inputStyle = {
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
};

function NoteCard({ note, me }) {
  const esMia = note.autor === me;
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {note.foto && (
        <img
          src={note.foto}
          alt={note.titulo}
          style={{
            width: "100%",
            maxHeight: "40vh",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      <div style={{ padding: "12px 14px" }}>
        <p
          style={{
            fontSize: 14,
            fontFamily: "var(--font-display)",
            color: "var(--accent)",
            wordBreak: "break-word",
          }}
        >
          💌 {note.titulo}
        </p>
        {note.descripcion && (
          <p
            style={{
              fontSize: 13,
              fontFamily: "var(--font-body)",
              color: "var(--text-sub)",
              marginTop: 6,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {note.descripcion}
          </p>
        )}
        <p
          style={{
            fontSize: 10,
            fontFamily: "var(--font-body)",
            color: "var(--text-muted)",
            marginTop: 10,
          }}
        >
          {esMia ? "Tú" : note.autor} · {note.fecha} · {note.hora}
        </p>
      </div>
    </div>
  );
}

export default function Notitas({ open, onClose, me }) {
  const { notes, loading, lastSeen, seenLoaded, addNote, markSeen } =
    useNotes(me);

  const [view, setView] = useState("list"); // list | add
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Modal automático con notitas nuevas del otro
  const [autoNotes, setAutoNotes] = useState([]);
  const autoChecked = useRef(false);

  // Se revisa UNA sola vez cuando ya cargaron notitas y "vistas"
  useEffect(() => {
    if (autoChecked.current || loading || !seenLoaded || !me) return;
    autoChecked.current = true;

    const unseen = notes.filter(
      (n) => n.autor !== me && (n.timestamp || 0) > lastSeen,
    );
    if (unseen.length > 0) {
      setAutoNotes(unseen);
      // Se marca como vista en cuanto sale, así no vuelve a aparecer sola
      markSeen(Math.max(...unseen.map((n) => n.timestamp || 0)));
    }
  }, [loading, seenLoaded, notes, lastSeen, me, markSeen]);

  // Si abre el histórico, también cuenta como vistas
  useEffect(() => {
    if (!open || !me) return;
    const latestOther = notes
      .filter((n) => n.autor !== me)
      .reduce((max, n) => Math.max(max, n.timestamp || 0), 0);
    if (latestOther > lastSeen) markSeen(latestOther);
  }, [open, notes, me, lastSeen, markSeen]);

  const resetForm = () => {
    setTitulo("");
    setDescripcion("");
    setPreview(null);
    setFile(null);
    setError("");
  };

  const handleClose = () => {
    setView("list");
    resetForm();
    onClose();
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    if (!titulo.trim()) return;
    setSaving(true);
    setError("");
    try {
      await addNote(file, titulo, descripcion);
      resetForm();
      setView("list");
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const title = view === "add" ? "Nueva notita" : "Nuestras notitas";

  return (
    <>
      {/* Modal automático (una sola vez) */}
      <Modal
        open={autoNotes.length > 0}
        onClose={() => setAutoNotes([])}
        title="💌 Tienes una notita nueva"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {autoNotes.map((n) => (
            <NoteCard key={n.id} note={n} me={me} />
          ))}
        </div>
        <button
          onClick={() => setAutoNotes([])}
          className="btn-primary"
          style={{ width: "100%", fontSize: 13, marginTop: 16 }}
        >
          Cerrar
        </button>
      </Modal>

      {/* Modal principal: histórico + agregar */}
      <Modal open={open} onClose={handleClose} title={title}>
        {view === "list" && (
          <>
            <button
              onClick={() => setView("add")}
              className="btn-primary"
              style={{ width: "100%", fontSize: 13, marginBottom: 16 }}
            >
              + Agregar notita
            </button>

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
            ) : notes.length === 0 ? (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                Aún no hay notitas. ¡Deja la primera sorpresa!
              </p>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {notes.map((n) => (
                  <NoteCard key={n.id} note={n} me={me} />
                ))}
              </div>
            )}
          </>
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
                  Toca para agregar una foto (opcional)
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

            {preview && (
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#f4678a",
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  cursor: "pointer",
                  marginBottom: 14,
                  padding: 0,
                }}
              >
                Quitar foto
              </button>
            )}

            <label style={labelStyle}>Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Para que sonrías hoy"
              maxLength={80}
              style={inputStyle}
            />

            <label style={labelStyle}>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Escribe lo que quieras decirle..."
              rows={4}
              style={{ ...inputStyle, resize: "vertical", marginBottom: 12 }}
            />

            <p
              style={{
                fontSize: 10,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                marginBottom: error ? 8 : 16,
              }}
            >
              La fecha y hora se guardan automáticamente.
            </p>

            {error && (
              <p
                style={{
                  fontSize: 11,
                  color: "#f4678a",
                  fontFamily: "var(--font-body)",
                  marginBottom: 14,
                }}
              >
                {error}
              </p>
            )}

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
    </>
  );
}
