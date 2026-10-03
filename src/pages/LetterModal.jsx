import { useEffect, useState, useRef } from "react";
import mensajes from "../assets/mensajes.json";

function getMensajeAleatorio(excludeId = null) {
  const ops =
    excludeId !== null ? mensajes.filter((m) => m.id !== excludeId) : mensajes;
  return ops[Math.floor(Math.random() * ops.length)];
}

// ── Hibisco pequeño para decorar ────────────────────────────────────────
function MiniHibiscus({ size = 28, opacity = 0.7 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <radialGradient id="mpG" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#ff6eb0" />
          <stop offset="100%" stopColor="#c0185a" />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((a, i) => (
        <g
          key={i}
          style={{ transformOrigin: "60px 60px", transform: `rotate(${a}deg)` }}
        >
          <ellipse
            cx="60"
            cy="28"
            rx="14"
            ry="27"
            fill="url(#mpG)"
            opacity="0.9"
          />
        </g>
      ))}
      <circle cx="60" cy="60" r="14" fill="#2a0010" />
      <line
        x1="60"
        y1="60"
        x2="60"
        y2="38"
        stroke="#f5a623"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {[
        [-5, -1],
        [0, -5],
        [5, -1],
      ].map(([dx, dy], i) => (
        <circle key={i} cx={60 + dx} cy={36 + dy} r="2" fill="#e53935" />
      ))}
    </svg>
  );
}

// ── Sobre con animación real de apertura ────────────────────────────────
function EnvelopeAnimated({ clicks, phase }) {
  // clicks: 0, 1, 2, 3
  // phase: 'idle' | 'shake' | 'opening' | 'open'

  // Solapa: 0deg cerrada, -180deg abierta (se rota sobre eje X)
  const flapAngle = phase === "open" ? -180 : phase === "opening" ? -90 : 0;

  // Carta sube progresivamente según clicks
  const cardY =
    phase === "open" ? -55 : clicks === 2 ? -25 : clicks === 1 ? -10 : 0;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "800px",
      }}
    >
      {/* Carta que sale del sobre */}
      <div
        style={{
          position: "absolute",
          width: 120,
          height: 80,
          bottom: 56,
          left: "50%",
          transform: `translateX(-50%) translateY(${-Math.max(0, cardY)}px)`,
          transition: "transform 0.5s cubic-bezier(0.34,1.2,0.64,1)",
          zIndex: 1,
          opacity: clicks >= 1 ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80" aria-hidden="true">
          <rect
            x="2"
            y="2"
            width="116"
            height="76"
            rx="6"
            fill="#fff"
            stroke="#e8e0d0"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <line
            x1="14"
            y1="25"
            x2="106"
            y2="25"
            stroke="#b2ece0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="38"
            x2="106"
            y2="38"
            stroke="#b2ece0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="51"
            x2="80"
            y2="51"
            stroke="#b2ece0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text x="60" y="15" fontSize="10" textAnchor="middle" fill="#2dbfa3">
            ♡
          </text>
        </svg>
      </div>

      {/* Cuerpo del sobre */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <svg width="240" height="155" viewBox="0 0 240 155" aria-hidden="true">
          <defs>
            <linearGradient id="envB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fafaf8" />
              <stop offset="100%" stopColor="#f0ede8" />
            </linearGradient>
          </defs>

          {/* Cuerpo */}
          <rect
            x="10"
            y="55"
            width="220"
            height="92"
            rx="8"
            fill="url(#envB)"
            stroke="#e8e0d0"
            strokeWidth="1"
          />

          {/* Líneas laterales interiores */}
          <line
            x1="10"
            y1="147"
            x2="120"
            y2="100"
            stroke="#e0d8cc"
            strokeWidth="0.8"
          />
          <line
            x1="230"
            y1="147"
            x2="120"
            y2="100"
            stroke="#e0d8cc"
            strokeWidth="0.8"
          />

          {/* Hojas verdes */}
          <path
            d="M38 128 Q24 104 42 86 Q39 112 56 122 Z"
            fill="#7dbf8c"
            opacity="0.72"
          />
          <path
            d="M26 138 Q10 116 28 96 Q26 122 46 132 Z"
            fill="#90cc9a"
            opacity="0.62"
          />
          <path
            d="M50 140 Q38 120 52 106 Q53 126 66 134 Z"
            fill="#7dbf8c"
            opacity="0.55"
          />

          {/* Lirio pequeño — también le gustan */}
          <g transform="translate(168,100)">
            {[0, 60, 120, 180, 240, 300].map((a, i) => (
              <g
                key={i}
                style={{ transformOrigin: "0 0", transform: `rotate(${a}deg)` }}
              >
                <ellipse
                  cx="0"
                  cy="-13"
                  rx="4"
                  ry="11"
                  fill="#fff"
                  opacity="0.85"
                  stroke="#e8e0d0"
                  strokeWidth="0.5"
                />
              </g>
            ))}
            <circle cx="0" cy="0" r="4" fill="#f5e642" opacity="0.9" />
          </g>

          {/* Sello cera */}
          <circle cx="120" cy="118" r="20" fill="#c9a84c" />
          <circle cx="120" cy="118" r="17" fill="#d4af57" />
          <text
            x="120"
            y="124"
            fontSize="16"
            textAnchor="middle"
            fill="#8b6914"
          >
            ✿
          </text>

          {/* Solapa — animada con CSS transform 3D */}
          <g
            style={{
              transformOrigin: "120px 55px",
              transform: `perspective(600px) rotateX(${flapAngle}deg)`,
              transition: "transform 0.55s cubic-bezier(0.34,1.1,0.64,1)",
            }}
          >
            {/* Cara exterior solapa */}
            <path
              d="M10 55 L120 118 L230 55 Z"
              fill={clicks >= 2 ? "#f0ede8" : "#faf8f5"}
              stroke="#e8e0d0"
              strokeWidth="1"
            />
            {/* Cara interior solapa (visible al abrir) */}
            <path
              d="M10 55 L120 118 L230 55 Z"
              fill="#fff8f5"
              opacity="0.6"
              style={{ backfaceVisibility: "hidden" }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ── Indicador visual de progreso ────────────────────────────────────────
function ProgressHint({ clicks, max }) {
  const msgs = [
    "Toca el sobre para abrirlo ✨",
    "Una vez más... 💕",
    "Ya casi se abre... 🌸",
    "",
  ];
  return (
    <div style={{ textAlign: "center", marginTop: 4 }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: i < clicks ? "var(--accent)" : "var(--border)",
              boxShadow: i < clicks ? "0 0 6px var(--accent)" : "none",
              transition: "all 0.3s cubic-bezier(0.34,1.5,0.64,1)",
              transform: i < clicks ? "scale(1.35)" : "scale(1)",
            }}
          />
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--text-muted)",
          minHeight: 20,
          transition: "opacity 0.3s",
        }}
      >
        {msgs[Math.min(clicks, max)]}
      </p>
    </div>
  );
}

// ── Modal principal ─────────────────────────────────────────────────────
export default function LetterModal({ onClose }) {
  const [clicks, setClicks] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [shaking, setShaking] = useState(false);
  const [mensaje, setMensaje] = useState(() => getMensajeAleatorio());
  const prevIdRef = useRef(mensaje.id);
  const MAX = 3;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleEnvelopeClick() {
    if (phase === "open") return;

    // Tambaleo en cada clic
    setShaking(true);
    setTimeout(() => setShaking(false), 500);

    const next = clicks + 1;
    setClicks(next);

    if (next === 1) setPhase("idle");
    else if (next === 2) setPhase("opening");
    else if (next >= MAX) {
      setPhase("open");
    }
  }

  function handleClose() {
    const nuevo = getMensajeAleatorio(prevIdRef.current);
    prevIdRef.current = nuevo.id;
    setMensaje(nuevo);
    onClose();
  }

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Carta de amor"
    >
      <div className="modal-sheet">
        {/* Keyframes tambaleo */}
        <style>{`
          @keyframes wobble {
            0%   { transform: rotate(0deg)   translateX(0); }
            15%  { transform: rotate(-5deg)  translateX(-4px); }
            30%  { transform: rotate(5deg)   translateX(4px); }
            45%  { transform: rotate(-4deg)  translateX(-3px); }
            60%  { transform: rotate(4deg)   translateX(3px); }
            75%  { transform: rotate(-2deg)  translateX(-2px); }
            90%  { transform: rotate(2deg)   translateX(2px); }
            100% { transform: rotate(0deg)   translateX(0); }
          }
          .wobble { animation: wobble 0.5s ease both; }
        `}</style>

        {/* Handle */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "var(--border)",
            margin: "0 auto 16px",
          }}
        />

        {/* Hibiscos decorativos */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingInline: 8,
            marginBottom: -8,
          }}
        >
          <MiniHibiscus size={24} opacity={0.55} />
          <MiniHibiscus size={24} opacity={0.55} />
        </div>

        {/* ── SOBRE (visible hasta abrir) ── */}
        {phase !== "open" && (
          <>
            <div
              className={shaking ? "wobble" : ""}
              onClick={handleEnvelopeClick}
              style={{ cursor: "pointer", userSelect: "none" }}
              role="button"
              aria-label={`Haz clic ${MAX - clicks} ${MAX - clicks === 1 ? "vez" : "veces"} más para abrir la carta`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleEnvelopeClick()}
            >
              <EnvelopeAnimated clicks={clicks} phase={phase} />
            </div>
            <ProgressHint clicks={clicks} max={MAX} />
            <div style={{ height: 8 }} />
          </>
        )}

        {/* ── CARTA ABIERTA ── */}
        {phase === "open" && (
          <>
            {/* Sobre pequeño con solapa abierta */}
            <div style={{ pointerEvents: "none" }}>
              <EnvelopeAnimated clicks={3} phase="open" />
            </div>

            {/* Carta */}
            <div
              className="animate-fadeInUp"
              style={{
                border: "1px dashed var(--btn-primary)",
                borderRadius: 14,
                padding: "18px 16px",
                marginBottom: 16,
                background: "var(--bg-subtle)",
                position: "relative",
              }}
            >
              {/* Hibiscos en esquinas */}
              <div style={{ position: "absolute", top: 8, right: 10 }}>
                <MiniHibiscus size={20} opacity={0.4} />
              </div>
              <div style={{ position: "absolute", bottom: 8, left: 10 }}>
                <MiniHibiscus size={20} opacity={0.4} />
              </div>

              <div style={{ textAlign: "center", marginBottom: 12 }}>
                <span
                  style={{
                    color: "var(--btn-primary)",
                    fontSize: 13,
                    letterSpacing: 8,
                  }}
                >
                  ✦ ✦ ✦
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  color: "var(--accent)",
                  marginBottom: 12,
                }}
              >
                Mi Amor,
              </p>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "var(--text-sub)",
                  lineHeight: 1.9,
                  textAlign: "center",
                }}
              >
                "{mensaje.mensaje}"
              </p>

              <div style={{ textAlign: "center", marginTop: 16 }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--btn-primary)",
                    marginBottom: 4,
                  }}
                >
                  Con todo mi corazón,
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    color: "var(--accent)",
                  }}
                >
                  Tu persona favorita
                </p>
                <p style={{ fontSize: 22, marginTop: 8 }}>✨</p>
              </div>
            </div>

            <button className="btn-primary" onClick={handleClose}>
              Cerrar con un beso 💋
            </button>
          </>
        )}
      </div>
    </div>
  );
}
