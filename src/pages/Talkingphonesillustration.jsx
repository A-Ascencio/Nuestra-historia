export default function TalkingPhonesIllustration({ style: outerStyle = {} }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...outerStyle }}>
      <style>{`
        .bubble-left {
          opacity: 0;
          animation: bubbleLeft 6s ease-in-out infinite;
        }
        .bubble-right {
          opacity: 0;
          animation: bubbleRight 6s ease-in-out infinite;
        }
        @keyframes bubbleLeft {
          0%, 4%   { opacity: 0; transform: translateY(6px); }
          10%, 42% { opacity: 1; transform: translateY(0); }
          48%      { opacity: 0; transform: translateY(-6px); }
          100%     { opacity: 0; }
        }
        @keyframes bubbleRight {
          0%, 46%  { opacity: 0; transform: translateY(6px); }
          52%, 88% { opacity: 1; transform: translateY(0); }
          94%      { opacity: 0; transform: translateY(-6px); }
          100%     { opacity: 0; }
        }
        .phone-glow {
          animation: phoneGlow 3s ease-in-out infinite;
        }
        @keyframes phoneGlow {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 0.95; }
        }
        .heart-mid {
          animation: heartMid 6s ease-in-out infinite;
        }
        @keyframes heartMid {
          0%, 20%  { opacity: 0; transform: translateY(4px) scale(0.7); }
          30%, 70% { opacity: 0.9; transform: translateY(-2px) scale(1); }
          80%      { opacity: 0; transform: translateY(-8px) scale(0.8); }
          100%     { opacity: 0; }
        }
      `}</style>

      <svg
        viewBox="0 0 360 160"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skyTalk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdf2f7" />
            <stop offset="100%" stopColor="#eaf7f2" />
          </linearGradient>
        </defs>

        <rect width="360" height="160" fill="url(#skyTalk)" />

        {/* Noche estrellada suave */}
        <circle cx="30" cy="20" r="1.4" fill="#f4c2d0" opacity="0.7" />
        <circle cx="60" cy="14" r="1" fill="#b2ece0" opacity="0.7" />
        <circle cx="300" cy="18" r="1.4" fill="#f4c2d0" opacity="0.7" />
        <circle cx="330" cy="26" r="1" fill="#b2ece0" opacity="0.7" />

        {/* ── Casa de ella (izq) ── */}
        <rect
          x="18"
          y="60"
          width="120"
          height="90"
          rx="10"
          fill="#fde8f0"
          opacity="0.7"
        />
        <rect
          x="18"
          y="60"
          width="120"
          height="14"
          rx="10"
          fill="#f4c2d0"
          opacity="0.5"
        />
        {/* ventana */}
        <rect
          x="40"
          y="82"
          width="76"
          height="52"
          rx="8"
          fill="#fff6fa"
          stroke="#f4c2d0"
          strokeWidth="2"
        />
        {/* ella sentada sobre la cama */}
        <ellipse cx="78" cy="122" rx="30" ry="9" fill="#ffd6e0" opacity="0.6" />
        <ellipse cx="70" cy="103" rx="9" ry="7" fill="#4a3728" />
        <circle cx="70" cy="107" r="7.5" fill="#f9d4be" />
        <ellipse cx="67.5" cy="106" rx="1.2" ry="1.4" fill="#2a1a0e" />
        <ellipse cx="72.5" cy="106" rx="1.2" ry="1.4" fill="#2a1a0e" />
        <circle cx="65" cy="109" r="2" fill="#f4a7b4" opacity="0.5" />
        <path d="M62 112 Q70 122 78 116 L74 122 L66 122 Z" fill="#a0d8ef" />
        <rect
          x="60"
          y="110"
          width="9"
          height="10"
          rx="2"
          fill="#ffffff"
          stroke="#f4c2d0"
          strokeWidth="1"
          className="phone-glow"
        />

        {/* burbuja de chat de ella */}
        <g className="bubble-left">
          <rect
            x="86"
            y="88"
            width="34"
            height="18"
            rx="8"
            fill="#ffffff"
            stroke="#f4c2d0"
            strokeWidth="1.5"
          />
          <circle cx="94" cy="97" r="2" fill="#f4678a" />
          <circle cx="103" cy="97" r="2" fill="#f4678a" />
          <circle cx="112" cy="97" r="2" fill="#f4678a" />
        </g>

        {/* ── Casa de él (der) ── */}
        <rect
          x="222"
          y="60"
          width="120"
          height="90"
          rx="10"
          fill="#e8faf5"
          opacity="0.7"
        />
        <rect
          x="222"
          y="60"
          width="120"
          height="14"
          rx="10"
          fill="#b2ece0"
          opacity="0.5"
        />
        <rect
          x="244"
          y="82"
          width="76"
          height="52"
          rx="8"
          fill="#f5fffb"
          stroke="#b2ece0"
          strokeWidth="2"
        />
        <ellipse
          cx="282"
          cy="122"
          rx="30"
          ry="9"
          fill="#cdeee2"
          opacity="0.6"
        />
        <ellipse cx="290" cy="103" rx="10" ry="6" fill="#2a1a0e" />
        <circle cx="290" cy="108" r="8" fill="#f9d4be" />
        <ellipse cx="287" cy="107" rx="1.2" ry="1.4" fill="#2a1a0e" />
        <ellipse cx="293" cy="107" rx="1.2" ry="1.4" fill="#2a1a0e" />
        <path
          d="M280 113 Q290 122 300 116 L296 122 L284 122 Z"
          fill="#90b8d8"
        />
        <rect
          x="292"
          y="110"
          width="9"
          height="10"
          rx="2"
          fill="#ffffff"
          stroke="#b2ece0"
          strokeWidth="1"
          className="phone-glow"
        />

        <g className="bubble-right">
          <rect
            x="246"
            y="88"
            width="34"
            height="18"
            rx="8"
            fill="#ffffff"
            stroke="#b2ece0"
            strokeWidth="1.5"
          />
          <circle cx="254" cy="97" r="2" fill="#2dbfa3" />
          <circle cx="263" cy="97" r="2" fill="#2dbfa3" />
          <circle cx="272" cy="97" r="2" fill="#2dbfa3" />
        </g>

        {/* Corazón viajando entre las dos casas */}
        <text
          x="180"
          y="70"
          fontSize="16"
          textAnchor="middle"
          fill="#f4678a"
          className="heart-mid"
        >
          ♡
        </text>

        {/* ondas de señal entre ambas casas */}
        <path
          d="M150 68 Q180 50 210 68"
          stroke="#f4c2d0"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 4"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
