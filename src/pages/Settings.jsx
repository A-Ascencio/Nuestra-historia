import useDates from "../hooks/useDates";
import { Lock } from "lucide-react";

export default function Settings({ theme, onThemeChange, onLogout }) {
  useDates();

  // Siempre hay uno activo: si llega algo distinto de "teal", se toma rosa
  const activeTheme = theme === "teal" ? "teal" : "pink";

  return (
    <div className="page animate-fadeIn">
      <div style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            marginBottom: 2,
          }}
        >
          personaliza
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px,4vw,32px)",
            fontWeight: 400,
            color: "var(--text-main)",
          }}
        >
          Ajustes
        </h2>
      </div>

      <div className="desktop-grid">
        {/* ── Tema de color ── */}
        <div
          className="card animate-fadeInUp delay-100"
          style={{ padding: 18, marginBottom: 14 }}
        >
          <p
            style={{
              fontSize: 9,
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              marginBottom: 14,
            }}
          >
            Tema de color
          </p>

          {[
            {
              id: "teal",
              label: "Turquesa pastel",
              sub: "Su color favorito 💚",
              bg: "#e8faf5",
              dot: "#2dbfa3",
              border: "#b2ece0",
            },
            {
              id: "pink",
              label: "Rosa pastel",
              sub: "Modo dulce 🌸",
              bg: "#fde8f0",
              dot: "#f4678a",
              border: "#f4c2d0",
            },
          ].map((opt, i) => {
            const active = activeTheme === opt.id;
            return (
              <div key={opt.id}>
                {i > 0 && (
                  <div
                    style={{
                      height: 0.5,
                      background: "var(--border)",
                      margin: "12px 0",
                    }}
                  />
                )}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onThemeChange(opt.id)}
                  onKeyDown={(e) => e.key === "Enter" && onThemeChange(opt.id)}
                  aria-pressed={active}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: opt.bg,
                        border: active
                          ? `2px solid ${opt.dot}`
                          : `1.5px solid ${opt.border}`,
                        transition: "border 0.3s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: opt.dot,
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--text-main)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                        }}
                      >
                        {opt.label}
                      </p>
                      <p
                        style={{
                          fontSize: 10,
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {opt.sub}
                      </p>
                    </div>
                  </div>
                  <div
                    className="toggle"
                    style={{ background: active ? opt.dot : "#ddd" }}
                  >
                    <div
                      className="toggle-thumb"
                      style={{ left: active ? "22px" : "3px" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Nuestras fechas ── */}
        <div
          className="card animate-fadeInUp delay-300"
          style={{ padding: 18, marginBottom: 14 }}
        >
          <p
            style={{
              fontSize: 9,
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              marginBottom: 14,
            }}
          >
            Nuestras fechas
          </p>
          {[
            { label: "Comenzamos a hablar", val: "18 jun 2026" },
            { label: "Nos conocimos", val: "24 jun 2026" },
            { label: "Te hiciste mi novia", val: "5 jul 2026" },
          ].map((item, i) => (
            <div key={i}>
              {i > 0 && (
                <div
                  style={{
                    height: 0.5,
                    background: "var(--border)",
                    margin: "10px 0",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-sub)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--accent)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {item.val}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Cerrar sesión ── */}
        <div
          className="desktop-full animate-fadeInUp delay-400"
          style={{ marginBottom: 14 }}
        >
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              padding: "13px 18px",
              borderRadius: 14,
              border: "1px solid var(--tag-border)",
              background: "var(--tag-bg)",
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Lock size={16} strokeWidth={1.75} />
            Cerrar sesión
          </button>
        </div>

        {/* Crédito */}
        <div
          className="desktop-full animate-fadeInUp delay-500"
          style={{ textAlign: "center", padding: "8px 0 4px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 12,
              fontStyle: "italic",
              color: "var(--text-muted)",
            }}
          >
            Hecho con ❤️ para ti
          </p>
        </div>
      </div>
    </div>
  );
}
