export default function IceCreamParkIllustration({ style: outerStyle = {} }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...outerStyle }}>
      <style>{`
        .cone-left {
          transform-box: fill-box;
          transform-origin: bottom center;
          animation: lick 2.4s ease-in-out infinite;
        }
        .cone-right {
          transform-box: fill-box;
          transform-origin: bottom center;
          animation: lick 2.4s ease-in-out infinite 1.2s;
        }
        @keyframes lick {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50%      { transform: rotate(-6deg) translateY(-2px); }
        }
        .bird {
          animation: birdFly 5s linear infinite;
        }
        @keyframes birdFly {
          0%   { transform: translate(0,0); }
          50%  { transform: translate(14px,-6px); }
          100% { transform: translate(0,0); }
        }
        .sparkle {
          animation: sparkle 2.6s ease-in-out infinite;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1; }
        }
      `}</style>

      <svg
        viewBox="0 0 360 160"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="skyPark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eaf7ff" />
            <stop offset="60%" stopColor="#eafaf2" />
            <stop offset="100%" stopColor="#cdeee2" />
          </linearGradient>
        </defs>

        <rect width="360" height="160" fill="url(#skyPark)" />
        <rect y="120" width="360" height="40" fill="#bfe6d2" />

        {/* Sol */}
        <circle cx="320" cy="26" r="14" fill="#ffe9a8" opacity="0.9" />

        {/* Árboles de fondo */}
        <rect x="40" y="80" width="6" height="42" fill="#a0785a" rx="3" />
        <circle cx="43" cy="72" r="24" fill="#9fd8b2" opacity="0.85" />
        <rect x="300" y="76" width="6" height="46" fill="#a0785a" rx="3" />
        <circle cx="303" cy="66" r="26" fill="#9fd8b2" opacity="0.85" />

        {/* pájaro */}
        <path
          className="bird"
          d="M90 40 Q95 35 100 40 Q105 35 110 40"
          stroke="#7a8a99"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Banca */}
        <rect x="120" y="120" width="120" height="7" rx="2" fill="#a0785a" />
        <rect x="126" y="128" width="6" height="16" fill="#7a5a3f" />
        <rect x="228" y="128" width="6" height="16" fill="#7a5a3f" />
        <rect x="120" y="104" width="120" height="7" rx="2" fill="#b98a63" />
        <rect x="126" y="98" width="6" height="24" fill="#7a5a3f" />
        <rect x="228" y="98" width="6" height="24" fill="#7a5a3f" />

        {/* pasto y flores */}
        <circle cx="70" cy="146" r="2" fill="#ffb7c5" opacity="0.7" />
        <circle cx="260" cy="150" r="2" fill="#ffd6e0" opacity="0.7" />
        <circle cx="300" cy="140" r="2" fill="#ffb7c5" opacity="0.6" />

        {/* ── Chica sentada, comiendo helado ── */}
        <ellipse cx="163" cy="88" rx="10" ry="8" fill="#4a3728" />
        <circle cx="163" cy="93" r="8.5" fill="#f9d4be" />
        <ellipse cx="160" cy="92" rx="1.3" ry="1.6" fill="#2a1a0e" />
        <ellipse cx="166" cy="92" rx="1.3" ry="1.6" fill="#2a1a0e" />
        <circle cx="158" cy="95" r="2.2" fill="#f4a7b4" opacity="0.5" />
        <path
          d="M160 97 Q163 99 165 97"
          stroke="#c0785a"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M154 101 Q150 112 149 122 L176 122 Q175 112 171 101 Z"
          fill="#f4c2d0"
        />
        <line
          x1="171"
          y1="105"
          x2="177"
          y2="112"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="154"
          y1="105"
          x2="150"
          y2="115"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="156"
          y1="122"
          x2="155"
          y2="132"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="170"
          y1="122"
          x2="171"
          y2="132"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* helado de ella */}
        <g className="cone-left">
          <path d="M177 108 L182 122 L172 122 Z" fill="#e0a878" />
          <circle cx="177" cy="105" r="7" fill="#ffb7c5" />
          <circle cx="177" cy="98" r="5.5" fill="#ffd6e0" />
        </g>

        {/* ── Chico sentado, comiendo helado ── */}
        <ellipse cx="197" cy="86" rx="11" ry="6.5" fill="#2a1a0e" />
        <circle cx="197" cy="92" r="9" fill="#f9d4be" />
        <ellipse cx="194" cy="91" rx="1.3" ry="1.6" fill="#2a1a0e" />
        <ellipse cx="200" cy="91" rx="1.3" ry="1.6" fill="#2a1a0e" />
        <path
          d="M195 96 Q197 98 199 96"
          stroke="#c0785a"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="189" y="100" width="16" height="22" fill="#90b8d8" rx="4" />
        <line
          x1="189"
          y1="104"
          x2="183"
          y2="112"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="205"
          y1="104"
          x2="210"
          y2="112"
          stroke="#f9d4be"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="192"
          y1="122"
          x2="191"
          y2="132"
          stroke="#4a5568"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="202"
          y1="122"
          x2="203"
          y2="132"
          stroke="#4a5568"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* helado de él */}
        <g className="cone-right">
          <path d="M182 106 L187 120 L177 120 Z" fill="#e0a878" />
          <circle cx="182" cy="103" r="7" fill="#ffe9a8" />
          <circle cx="182" cy="96" r="5.5" fill="#fff3d1" />
        </g>

        {/* brillitos */}
        <text x="150" y="90" fontSize="9" fill="#ffd6e0" className="sparkle">
          ✦
        </text>
        <text x="212" y="86" fontSize="9" fill="#ffe9a8" className="sparkle">
          ✦
        </text>
      </svg>
    </div>
  );
}
