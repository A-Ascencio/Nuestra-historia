import { useState } from "react";
import Modal from "../components/Modal";
import usePlaylist, { MAX_SONGS, normalizeLink } from "../hooks/usePlaylist";
import { Play, Trash2 } from "lucide-react";

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

export default function Playlist({ open, onClose }) {
  const { songs, addSong, deleteSong, loading } = usePlaylist();
  const [view, setView] = useState("list"); // list | add
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isFull = songs.length >= MAX_SONGS;

  const resetForm = () => {
    setTitulo("");
    setDescripcion("");
    setLink("");
    setError("");
  };

  const handleClose = () => {
    setView("list");
    resetForm();
    onClose();
  };

  const handleSave = async () => {
    if (!titulo.trim()) return;
    if (normalizeLink(link) === null) {
      setError("El link no parece válido. Revisa que esté completo.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await addSong(titulo, descripcion, link);
      resetForm();
      setView("list");
    } catch (err) {
      console.error(err);
      setError(
        err.message === "Playlist llena"
          ? `La playlist ya tiene ${MAX_SONGS} canciones.`
          : "No se pudo guardar. Intenta de nuevo.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (s) => {
    if (window.confirm(`¿Quitar "${s.titulo}" de la playlist?`)) {
      deleteSong(s.id);
    }
  };

  const title = view === "add" ? "Nueva canción" : "Nuestra playlist";

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      {view === "list" && (
        <>
          <button
            onClick={() => setView("add")}
            disabled={isFull}
            className="btn-primary"
            style={{
              width: "100%",
              fontSize: 13,
              marginBottom: 8,
              opacity: isFull ? 0.6 : 1,
            }}
          >
            + Agregar canción
          </button>

          <p
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            {songs.length} de {MAX_SONGS} canciones
            {isFull && " · Para agregar otra, borra una "}
          </p>

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
          ) : songs.length === 0 ? (
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              Aún no hay canciones. ¡Agreguen la primera!
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {songs.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--tag-bg)",
                      border: "0.5px solid var(--tag-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "var(--accent)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: "var(--font-body)",
                        color: "var(--text-main)",
                        wordBreak: "break-word",
                      }}
                    >
                      {s.titulo}
                    </p>
                    {s.descripcion && (
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
                        {s.descripcion}
                      </p>
                    )}
                    {s.link && (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: 8,
                          fontSize: 11,
                          fontFamily: "var(--font-body)",
                          color: "var(--tag-text)",
                          background: "var(--tag-bg)",
                          border: "0.5px solid var(--tag-border)",
                          borderRadius: 8,
                          padding: "4px 10px",
                          textDecoration: "none",
                        }}
                      >
                        ▶ Escuchar
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(s)}
                    aria-label={`Quitar "${s.titulo}"`}
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
          <label style={labelStyle}>Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Nombre de la canción - Artista"
            maxLength={80}
            style={inputStyle}
          />

          <label style={labelStyle}>Descripción (opcional)</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="¿Por qué es especial para ustedes?"
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <label style={labelStyle}>Link (opcional)</label>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Spotify, YouTube, etc."
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            style={{ ...inputStyle, marginBottom: error ? 8 : 16 }}
          />

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
  );
}
