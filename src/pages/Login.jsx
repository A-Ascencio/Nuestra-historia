import { useState } from "react";
import { Lock, LogIn } from "lucide-react";

// Cada quien con su propio usuario y contraseña
const USERS = [
  { id: "carino", user: "Cariño", pass: "010206", label: "Cariño" },
  { id: "amor", user: "Amor", pass: "020804", label: "Amor" },
];

// Quita acentos para que "Cariño" y "carino" sean equivalentes al escribir
function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function Login({ onSuccess }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const typedUser = normalize(usuario);
    const match = USERS.find(
      (u) => normalize(u.user) === typedUser && u.pass === password,
    );

    if (match) {
      setError(false);
      onSuccess(match.id, match.label);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <style>{`
        @keyframes shakeLogin {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .login-shake { animation: shakeLogin 0.4s ease-in-out; }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className={`card animate-fadeIn${shake ? " login-shake" : ""}`}
        style={{
          width: "100%",
          maxWidth: 340,
          padding: "32px 26px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Lock
          size={30}
          strokeWidth={1.5}
          style={{ color: "var(--accent)", marginBottom: 6 }}
        />
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 400,
            color: "var(--text-main)",
            marginBottom: 2,
          }}
        >
          Solo para nosotros
        </h1>
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          Ingresa con tu usuario para ver nuestra historia
        </p>

        <div style={{ width: "100%", marginBottom: 12 }}>
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
            Usuario
          </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.target.value);
              setError(false);
            }}
            placeholder="Usuario"
            autoComplete="username"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px 14px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-main)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        <div style={{ width: "100%", marginBottom: 8 }}>
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
            Contraseña
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Contraseña"
              autoComplete="current-password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 42px 11px 14px",
                borderRadius: 10,
                border: error ? "1px solid #f4678a" : "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-main)",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                padding: 0,
              }}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        {error && (
          <p
            style={{
              fontSize: 11,
              color: "#f4678a",
              fontFamily: "var(--font-body)",
              width: "100%",
              marginBottom: 8,
            }}
          >
            Usuario o contraseña incorrectos 💔
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%", fontSize: 14, marginTop: 8 }}
        >
          <span>💌</span> Entrar
        </button>
      </form>
    </div>
  );
}
