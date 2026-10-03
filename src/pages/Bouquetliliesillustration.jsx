function Lily({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
  petal = "#f4a0bf",
  petalEdge = "#f4678a",
  throat = "#fff3d6",
  anther = "#7a2c45",
  speckle = "#8a2c4a",
  delay = 0,
}) {
  const petalAngles = [0, 60, 120, 180, 240, 300];
  const stamenAngles = [30, 90, 150, 210, 270, 330];
  return (
    <g
      style={{ animationDelay: `${delay}s` }}
      transform={`translate(${x},${y}) rotate(${rotate}) scale(${scale})`}
    >
      {petalAngles.map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          {/* pétalo ancho tipo trompeta, curva hacia atrás en la punta */}
          <path
            d="M0 0 Q-5.5 -5 -5 -11 Q-4.5 -17 0 -22 Q4.5 -17 5 -11 Q5.5 -5 0 0 Z"
            fill={petal}
          />
          <path
            d="M0 -3 Q-3 -9 -2.6 -14 Q0 -16 0 -3 Z"
            fill={petalEdge}
            opacity="0.55"
          />
          <line
            x1="0"
            y1="-2"
            x2="0"
            y2="-20"
            stroke={petalEdge}
            strokeWidth="0.5"
            opacity="0.5"
          />
          <circle cx="-1.4" cy="-5" r="0.55" fill={speckle} opacity="0.75" />
          <circle cx="1.3" cy="-6.5" r="0.5" fill={speckle} opacity="0.65" />
          <circle cx="-0.8" cy="-8" r="0.45" fill={speckle} opacity="0.55" />
          <circle cx="0.9" cy="-4" r="0.4" fill={speckle} opacity="0.5" />
        </g>
      ))}
      {/* garganta de la flor */}
      <circle cx="0" cy="0" r="2.6" fill={throat} />
      {/* estambres largos y curvos con antera */}
      {stamenAngles.map((deg, i) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path
            d={`M0 0 Q${i % 2 === 0 ? 1.4 : -1.4} -9 0.6 -16`}
            stroke="#e0a878"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="0.6"
            cy="-16"
            rx="1.3"
            ry="2.1"
            fill={anther}
            transform={`rotate(${i % 2 === 0 ? 25 : -25} 0.6 -16)`}
          />
        </g>
      ))}
      <circle cx="0" cy="0" r="1" fill="#ffe9c2" />
    </g>
  );
}

function LilyBud({ x = 0, y = 0, rotate = 0, color = "#e8b6c9" }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <path
        d="M0 14 L0 0"
        stroke="#5a8a5a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M0 0 Q-3.5 -3 -3 -9 Q-1.6 -14 0 -16 Q1.6 -14 3 -9 Q3.5 -3 0 0 Z"
        fill="#8bbf7a"
      />
      <path
        d="M0 -2 Q-2 -7 -1.6 -11 Q0 -14 1.6 -11 Q2 -7 0 -2 Z"
        fill={color}
        opacity="0.9"
      />
    </g>
  );
}

export default function BouquetLiliesIllustration({ style: outerStyle = {} }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...outerStyle }}>
      <style>{`
        /* ── Secuencia de entrega, ciclo de 5s ── */
        .bouquet-arm {
          transform-box: fill-box;
          transform-origin: left center;
          animation: offer 5s ease-in-out infinite;
        }
        @keyframes offer {
          0%, 16%   { transform: translate(0,0) rotate(0deg); }
          40%, 66%  { transform: translate(11px,-2px) rotate(-9deg); }
          90%,100%  { transform: translate(0,0) rotate(0deg); }
        }
        .sparkle-a { animation: spk 2.2s ease-in-out infinite; }
        .sparkle-b { animation: spk 2.2s ease-in-out infinite 0.7s; }
        .sparkle-c { animation: spk 2.2s ease-in-out infinite 1.4s; }
        @keyframes spk {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%      { opacity: 1; transform: scale(1.15); }
        }
        .blush-heart {
          animation: appearHeart 6s ease-in-out infinite;
        }
        @keyframes appearHeart {
          0%, 30%  { opacity: 0; transform: translateY(4px); }
          42%, 70% { opacity: 1; transform: translateY(0); }
          85%,100% { opacity: 0; }
        }
      `}</style>

      <svg
        viewBox="0 0 360 160"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skyBouquet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdeef6" />
            <stop offset="100%" stopColor="#e8f5ee" />
          </linearGradient>
        </defs>

        <rect width="360" height="160" fill="url(#skyBouquet)" />
        <rect y="128" width="360" height="32" fill="#cdeee2" opacity="0.7" />

        {/* arbustos de fondo */}
        <circle cx="50" cy="120" r="20" fill="#c9e8b8" opacity="0.6" />
        <circle cx="310" cy="118" r="24" fill="#c9e8b8" opacity="0.6" />
        <circle cx="90" cy="128" r="12" fill="#f4c2d0" opacity="0.5" />
        <circle cx="280" cy="130" r="10" fill="#f4c2d0" opacity="0.5" />

        {/* ── Chica recibiendo ── */}
        <ellipse cx="216" cy="88" rx="11" ry="8" fill="#4a3728" />
        <ellipse cx="208" cy="92" rx="4" ry="9" fill="#4a3728" />
        <ellipse cx="224" cy="92" rx="4" ry="9" fill="#4a3728" />
        <circle cx="216" cy="93" r="9" fill="#f9d4be" />
        <ellipse cx="213" cy="92" rx="1.4" ry="1.7" fill="#2a1a0e" />
        <ellipse cx="219" cy="92" rx="1.4" ry="1.7" fill="#2a1a0e" />
        <circle cx="211" cy="95" r="2.4" fill="#f4a7b4" opacity="0.55" />
        <circle cx="221" cy="95" r="2.4" fill="#f4a7b4" opacity="0.55" />
        <path
          d="M212 98 Q216 101 220 98"
          stroke="#c0785a"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M208 102 Q203 116 201 132 L231 132 Q229 116 224 102 Z"
          fill="#f4c2d0"
        />
        <line
          x1="209"
          y1="107"
          x2="200"
          y2="116"
          stroke="#f9d4be"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="223"
          y1="107"
          x2="230"
          y2="118"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="210"
          y1="132"
          x2="209"
          y2="146"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="222"
          y1="132"
          x2="223"
          y2="146"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ── Chico entregando el ramo ── */}
        <ellipse cx="150" cy="86" rx="12" ry="7" fill="#2a1a0e" />
        <circle cx="150" cy="92" r="10" fill="#f9d4be" />
        <ellipse cx="147" cy="91" rx="1.4" ry="1.7" fill="#2a1a0e" />
        <ellipse cx="153" cy="91" rx="1.4" ry="1.7" fill="#2a1a0e" />
        <path
          d="M147 96 Q150 99 153 96"
          stroke="#c0785a"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="141" y="102" width="18" height="26" fill="#90b8d8" rx="4" />
        <line
          x1="159"
          y1="106"
          x2="165"
          y2="112"
          stroke="#f9d4be"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="145"
          y1="128"
          x2="144"
          y2="142"
          stroke="#4a5568"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="155"
          y1="128"
          x2="156"
          y2="142"
          stroke="#4a5568"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* brazo que ofrece el ramo (animado) */}
        <g className="bouquet-arm">
          <line
            x1="141"
            y1="106"
            x2="176"
            y2="118"
            stroke="#f9d4be"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          <g transform="translate(176,110) scale(0.5)">
            {/* tallos */}
            <path
              d="M0 26 L2 -1"
              stroke="#4d8a5a"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 26 L2 2"
              stroke="#4d8a5a"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M-6 26 L-2 2"
              stroke="#4d8a5a"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M11 27 L4 6"
              stroke="#4d8a5a"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M-11 27 L-4 6"
              stroke="#4d8a5a"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* hojas */}
            <path d="M2 12 Q11 9 10 1 Q2 4 2 12Z" fill="#5fa868" />
            <path d="M-1 16 Q-10 14 -9 6 Q-1 9 -1 16Z" fill="#6fae6f" />
            <path d="M4 20 Q12 19 12 12 Q5 13 4 20Z" fill="#4d8a5a" />

            {/* envoltorio tipo cono, dos tonos + moño */}
            <path
              d="M-14 22 L15 22 L24 40 Q0 47 -23 40 Z"
              fill="#fdf3ea"
              stroke="#f0d9c4"
              strokeWidth="1"
            />
            <path
              d="M2 22 L15 22 L24 40 Q10 44 0 43 Z"
              fill="#f9c9a8"
              opacity="0.55"
            />
            <path
              d="M-8 24 L-11 37"
              stroke="#f0d9c4"
              strokeWidth="0.8"
              opacity="0.7"
            />
            <path
              d="M0 24 L-1 39"
              stroke="#f0d9c4"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <path
              d="M8 24 L11 37"
              stroke="#f0d9c4"
              strokeWidth="0.8"
              opacity="0.6"
            />
            {/* moño */}
            <ellipse
              cx="-6"
              cy="30"
              rx="4"
              ry="2.6"
              fill="#f4a7b4"
              transform="rotate(-20 -6 30)"
            />
            <ellipse
              cx="6"
              cy="30"
              rx="4"
              ry="2.6"
              fill="#f4a7b4"
              transform="rotate(20 6 30)"
            />
            <circle cx="0" cy="30" r="2" fill="#f4678a" />

            {/* capullo verde-rosa sin abrir */}
            <LilyBud x={-16} y={-4} rotate={-10} />

            {/* lirio blanco (abajo-izquierda, grande) */}
            <Lily
              x={-11}
              y={-9}
              rotate={-14}
              scale={0.95}
              petal="#fdfaf3"
              petalEdge="#f4dfe8"
              throat="#eef6dc"
              anther="#c07a3f"
              speckle="#c9a0ad"
              delay={0.6}
            />

            {/* lirio rosa principal (centro, el más grande) */}
            <Lily
              x={2}
              y={-16}
              rotate={4}
              scale={1.05}
              petal="#f4a0bf"
              petalEdge="#e8628e"
              throat="#fff0e0"
              anther="#7a2c45"
              speckle="#8a2c4a"
              delay={0}
            />

            {/* lirio rosa secundario (arriba-derecha) */}
            <Lily
              x={13}
              y={-6}
              rotate={20}
              scale={0.8}
              petal="#f6b3cc"
              petalEdge="#ea7ea3"
              throat="#fff3e6"
              anther="#7a2c45"
              speckle="#8a2c4a"
              delay={1.2}
            />
          </g>
        </g>

        {/* corazoncito de emoción */}
        <text
          x="192"
          y="76"
          fontSize="12"
          textAnchor="middle"
          fill="#f4678a"
          className="blush-heart"
        >
          ♡
        </text>

        {/* brillitos alrededor del ramo */}
        <text x="200" y="96" fontSize="8" fill="#ffd6e0" className="sparkle-a">
          ✦
        </text>
        <text x="208" y="120" fontSize="7" fill="#f4c2d0" className="sparkle-b">
          ✦
        </text>
        <text x="194" y="128" fontSize="7" fill="#ffb7c5" className="sparkle-c">
          ✦
        </text>
      </svg>
    </div>
  );
}
