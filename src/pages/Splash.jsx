import { useEffect, useState } from "react";

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${3 + ((i * 5.5) % 94)}%`,
  delay: `${(i * 0.22).toFixed(2)}s`,
  duration: `${3.2 + (i % 5) * 0.6}s`,
  size: `${9 + (i % 4) * 3}px`,
  rotate: (i * 37) % 360,
  opacity: 0.55 + (i % 3) * 0.15,
}));

// Hibisco SVG — flor favorita de ella
function HibiscusSVG({ size = 110 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="petalG" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#ff6eb0" />
          <stop offset="60%" stopColor="#e8357a" />
          <stop offset="100%" stopColor="#c0185a" />
        </radialGradient>
        <radialGradient id="centerG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3a0018" />
          <stop offset="100%" stopColor="#1a000c" />
        </radialGradient>
      </defs>
      {/* 5 pétalos */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g
          key={i}
          style={{
            transformOrigin: "60px 60px",
            transform: `rotate(${angle}deg)`,
          }}
        >
          <ellipse
            cx="60"
            cy="28"
            rx="16"
            ry="30"
            fill="url(#petalG)"
            opacity="0.92"
            style={{ transformOrigin: "60px 60px" }}
          />
          {/* venas del pétalo */}
          <line
            x1="60"
            y1="58"
            x2="60"
            y2="10"
            stroke="#fff"
            strokeWidth="0.6"
            opacity="0.3"
          />
          <line
            x1="60"
            y1="48"
            x2="52"
            y2="18"
            stroke="#fff"
            strokeWidth="0.4"
            opacity="0.2"
          />
          <line
            x1="60"
            y1="48"
            x2="68"
            y2="18"
            stroke="#fff"
            strokeWidth="0.4"
            opacity="0.2"
          />
        </g>
      ))}
      {/* Centro oscuro */}
      <circle cx="60" cy="60" r="16" fill="url(#centerG)" />
      {/* Estambre — tubo */}
      <line
        x1="60"
        y1="60"
        x2="60"
        y2="36"
        stroke="#f5a623"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Anteras */}
      {[
        [-6, -2],
        [0, -6],
        [6, -2],
        [8, 3],
        [-8, 3],
      ].map(([dx, dy], i) => (
        <g key={i}>
          <circle cx={60 + dx} cy={36 + dy} r="2.5" fill="#f5a623" />
          <circle cx={60 + dx} cy={36 + dy - 4} r="1.5" fill="#e53935" />
        </g>
      ))}
      {/* Brillo pétalo */}
      <ellipse
        cx="52"
        cy="35"
        rx="5"
        ry="10"
        fill="#fff"
        opacity="0.12"
        transform="rotate(-20,52,35)"
      />
    </svg>
  );
}

export default function Splash({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 2800);
    const t3 = setTimeout(onDone, 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        transition: "opacity 0.7s ease",
        opacity: phase === 2 ? 0 : 1,
        pointerEvents: phase === 2 ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* Pétalos cayendo */}
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            top: "-20px",
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate}deg)`,
            opacity: phase >= 1 ? p.opacity : 0,
            transition: "opacity 0.4s",
            borderRadius: "0 50% 50% 50%",
            background: "#ffb7c5",
          }}
        />
      ))}

      {/* Hibisco central animado */}
      <div
        className="animate-heartbeat"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 0.6s ease",
          marginBottom: 24,
          filter: "drop-shadow(0 4px 16px rgba(232,53,122,0.35))",
        }}
      >
        <HibiscusSVG size={110} />
      </div>

      {/* Texto */}
      <div
        style={{
          textAlign: "center",
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 0.7s ease 0.25s",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 400,
            color: "var(--text-main)",
            marginBottom: 8,
          }}
        >
          mi amor
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          para ti, siempre
        </p>
      </div>

      {/* Destellos */}
      {phase >= 1 &&
        ["10% 18%", "88% 14%", "6% 78%", "92% 72%", "50% 6%", "75% 45%"].map(
          (pos, i) => (
            <div
              key={i}
              className="animate-shimmer"
              style={{
                position: "absolute",
                left: pos.split(" ")[0],
                top: pos.split(" ")[1],
                fontSize: 10 + i * 2,
                color: "var(--accent)",
                animationDelay: `${i * 0.28}s`,
                pointerEvents: "none",
              }}
            >
              ✦
            </div>
          ),
        )}
    </div>
  );
}
