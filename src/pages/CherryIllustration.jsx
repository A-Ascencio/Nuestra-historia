import { useEffect, useRef } from "react";

// Pétalos que caen animados sobre el canvas
const FALLING = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 4 + ((i * 7) % 92),
  delay: (i * 0.3) % 4,
  dur: 2.8 + (i % 5) * 0.5,
  size: 5 + (i % 3) * 3,
  rot: (i * 47) % 360,
  swing: 8 + (i % 4) * 5,
}));

function FallingPetal({ x, delay, dur, size, rot, swing }) {
  const style = {
    position: "absolute",
    top: "-12px",
    left: `${x}%`,
    width: size,
    height: size,
    borderRadius: "0 50% 50% 50%",
    background: "#ffb7c5",
    opacity: 0.75,
    animation: `petalFall ${dur}s ${delay}s ease-in infinite`,
    transformOrigin: "center center",
    transform: `rotate(${rot}deg)`,
    pointerEvents: "none",
  };
  return <div style={style} aria-hidden="true" />;
}

export default function CherryIllustration({ style: outerStyle = {} }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...outerStyle }}>
      {/* Keyframes inyectados una vez */}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(0)   translateX(0)            rotate(0deg);   opacity:0; }
          10%  { opacity: 0.75; }
          50%  { transform: translateY(50%) translateX(var(--sw,8px)) rotate(120deg); }
          90%  { opacity: 0.5; }
          100% { transform: translateY(160px) translateX(0)           rotate(280deg); opacity:0; }
        }

        /* ── Secuencia de beso, ciclo de 9s ──
           0.0s - 3.0s : reposo
           3.0s - 3.6s : él se acerca (roba un beso en el cachete)
           3.6s - 4.3s : sostiene el beso
           4.3s - 4.9s : él regresa a su lugar
           4.9s - 6.5s : reposo
           6.5s - 7.1s : ella se acerca (le da un beso en el cachete)
           7.1s - 7.8s : sostiene el beso
           7.8s - 8.4s : ella regresa a su lugar
           8.4s - 9.0s : reposo
        */
        .boy-fig {
          animation: kissBoy 9s ease-in-out infinite;
          transform-box: fill-box;
        }
        .girl-fig {
          animation: kissGirl 9s ease-in-out infinite;
          transform-box: fill-box;
        }
        @keyframes kissBoy {
          0%, 33%   { transform: translate(0, 0) rotate(0deg); }
          40%, 47%  { transform: translate(-9px, 2px) rotate(-6deg); }
          54%       { transform: translate(0, 0) rotate(0deg); }
          100%      { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes kissGirl {
          0%, 72%   { transform: translate(0, 0) rotate(0deg); }
          79%, 86%  { transform: translate(9px, 2px) rotate(6deg); }
          93%       { transform: translate(0, 0) rotate(0deg); }
          100%      { transform: translate(0, 0) rotate(0deg); }
        }
        .kiss-heart-1 {
          opacity: 0;
          animation: kissHeart1 9s ease-in-out infinite;
        }
        @keyframes kissHeart1 {
          0%, 38%   { opacity: 0; transform: translateY(0) scale(0.6); }
          42%, 49%  { opacity: 1; transform: translateY(-4px) scale(1); }
          55%       { opacity: 0; transform: translateY(-8px) scale(0.8); }
          100%      { opacity: 0; }
        }
        .kiss-heart-2 {
          opacity: 0;
          animation: kissHeart2 9s ease-in-out infinite;
        }
        @keyframes kissHeart2 {
          0%, 77%   { opacity: 0; transform: translateY(0) scale(0.6); }
          81%, 88%  { opacity: 1; transform: translateY(-4px) scale(1); }
          94%       { opacity: 0; transform: translateY(-8px) scale(0.8); }
          100%      { opacity: 0; }
        }
      `}</style>

      {/* Pétalos cayendo */}
      {FALLING.map((p) => (
        <FallingPetal key={p.id} {...p} />
      ))}

      {/* Ilustración SVG base — siempre igual en ambos temas */}
      <svg
        viewBox="0 0 360 160"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fce4ec" />
            <stop offset="60%" stopColor="#e8f5e9" />
            <stop offset="100%" stopColor="#c8f0e0" />
          </linearGradient>
          <linearGradient id="gnd2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8f0e0" />
            <stop offset="100%" stopColor="#a8dece" />
          </linearGradient>
        </defs>

        {/* Fondo */}
        <rect width="360" height="160" fill="url(#sky2)" />
        <rect y="118" width="360" height="42" fill="url(#gnd2)" />

        {/* Árbol izq grande */}
        <rect x="34" y="75" width="7" height="55" fill="#a0785a" rx="3" />
        <circle cx="38" cy="62" r="32" fill="#ffb7c5" opacity="0.88" />
        <circle cx="22" cy="54" r="22" fill="#ffc8d3" opacity="0.82" />
        <circle cx="56" cy="50" r="24" fill="#ffb7c5" opacity="0.78" />
        <circle cx="38" cy="44" r="18" fill="#ffd6e0" opacity="0.70" />

        {/* Árbol der grande */}
        <rect x="319" y="75" width="7" height="55" fill="#a0785a" rx="3" />
        <circle cx="322" cy="62" r="32" fill="#ffb7c5" opacity="0.88" />
        <circle cx="308" cy="54" r="22" fill="#ffc8d3" opacity="0.82" />
        <circle cx="338" cy="50" r="24" fill="#ffb7c5" opacity="0.78" />
        <circle cx="322" cy="44" r="18" fill="#ffd6e0" opacity="0.70" />

        {/* Árbol centro izq */}
        <rect x="118" y="88" width="5" height="40" fill="#a0785a" rx="2" />
        <circle cx="120" cy="78" r="20" fill="#ffd6e0" opacity="0.82" />
        <circle cx="110" cy="72" r="14" fill="#ffb7c5" opacity="0.75" />

        {/* Árbol centro der */}
        <rect x="237" y="85" width="5" height="43" fill="#a0785a" rx="2" />
        <circle cx="239" cy="74" r="22" fill="#ffb7c5" opacity="0.80" />
        <circle cx="250" cy="70" r="15" fill="#ffd6e0" opacity="0.72" />

        {/* Pétalos estáticos suelo */}
        <ellipse
          cx="90"
          cy="115"
          rx="5"
          ry="3"
          fill="#ffb7c5"
          opacity="0.60"
          transform="rotate(-25 90 115)"
        />
        <ellipse
          cx="160"
          cy="112"
          rx="4"
          ry="2.5"
          fill="#ffc8d3"
          opacity="0.55"
          transform="rotate(15 160 112)"
        />
        <ellipse
          cx="210"
          cy="116"
          rx="4.5"
          ry="2.5"
          fill="#ffb7c5"
          opacity="0.50"
          transform="rotate(-10 210 116)"
        />
        <ellipse
          cx="270"
          cy="113"
          rx="3.5"
          ry="2"
          fill="#ffd6e0"
          opacity="0.60"
          transform="rotate(20 270 113)"
        />

        {/* ── Chica ── */}
        <g className="girl-fig">
          <ellipse cx="168" cy="92" rx="11" ry="8" fill="#4a3728" />
          <ellipse cx="160" cy="96" rx="4" ry="9" fill="#4a3728" />
          <ellipse cx="176" cy="96" rx="4" ry="9" fill="#4a3728" />
          <circle cx="168" cy="97" r="9" fill="#f9d4be" />
          <ellipse cx="165" cy="96" rx="1.5" ry="1.8" fill="#2a1a0e" />
          <ellipse cx="171" cy="96" rx="1.5" ry="1.8" fill="#2a1a0e" />
          <circle cx="163" cy="99" r="2.5" fill="#f4a7b4" opacity="0.5" />
          <circle cx="173" cy="99" r="2.5" fill="#f4a7b4" opacity="0.5" />
          <path
            d="M166 101 Q168 103 170 101"
            stroke="#c0785a"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M160 106 Q155 118 153 132 L183 132 Q181 118 176 106 Z"
            fill="#a0d8ef"
          />
          <line
            x1="160"
            y1="110"
            x2="153"
            y2="120"
            stroke="#f9d4be"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="176"
            y1="110"
            x2="181"
            y2="118"
            stroke="#f9d4be"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="162"
            y1="132"
            x2="161"
            y2="146"
            stroke="#f9d4be"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="174"
            y1="132"
            x2="175"
            y2="146"
            stroke="#f9d4be"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* ── Chico ── */}
        <g className="boy-fig">
          <ellipse cx="192" cy="90" rx="12" ry="7" fill="#2a1a0e" />
          <circle cx="192" cy="96" r="10" fill="#f9d4be" />
          <ellipse cx="189" cy="95" rx="1.5" ry="1.8" fill="#2a1a0e" />
          <ellipse cx="195" cy="95" rx="1.5" ry="1.8" fill="#2a1a0e" />
          <circle cx="187" cy="98" r="2.5" fill="#f4a7b4" opacity="0.4" />
          <circle cx="197" cy="98" r="2.5" fill="#f4a7b4" opacity="0.4" />
          <path
            d="M190 100 Q192 102 194 100"
            stroke="#c0785a"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="183" y="106" width="18" height="26" fill="#90b8d8" rx="4" />
          <line
            x1="183"
            y1="110"
            x2="176"
            y2="119"
            stroke="#f9d4be"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="201"
            y1="110"
            x2="207"
            y2="119"
            stroke="#f9d4be"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <line
            x1="187"
            y1="132"
            x2="186"
            y2="146"
            stroke="#4a5568"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="197"
            y1="132"
            x2="198"
            y2="146"
            stroke="#4a5568"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* Corazoncitos del beso */}
        <text
          x="176"
          y="86"
          fontSize="11"
          textAnchor="middle"
          fill="#f4678a"
          className="kiss-heart-1"
        >
          ♡
        </text>
        <text
          x="182"
          y="86"
          fontSize="11"
          textAnchor="middle"
          fill="#f4678a"
          className="kiss-heart-2"
        >
          ♡
        </text>

        {/* Corazón fijo de fondo */}
        <text
          x="180"
          y="84"
          fontSize="14"
          textAnchor="middle"
          fill="#f4678a"
          opacity="0.9"
        >
          ♡
        </text>

        {/* Detalles extra */}
        <circle cx="145" cy="108" r="2" fill="#ffc8d3" opacity="0.7" />
        <circle cx="215" cy="105" r="2.5" fill="#ffd6e0" opacity="0.6" />
        <circle cx="130" cy="120" r="1.5" fill="#ffb7c5" opacity="0.5" />
      </svg>
    </div>
  );
}
