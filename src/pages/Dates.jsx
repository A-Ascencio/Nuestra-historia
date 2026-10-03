import useDates from "../hooks/useDates";
import TalkingPhonesIllustration from "./Talkingphonesillustration";
import IceCreamParkIllustration from "./Icecreamparkillustration";
import BouquetLiliesIllustration from "./Bouquetliliesillustration";
import { useState } from "react";
import LetterModal from "./LetterModal";
import { MessageCircle, Handshake, Heart, Plus, Mail } from "lucide-react";

const EVENTS = [
  {
    key: "hablando",
    icon: "💬",
    label: "Comenzamos a hablar",
    date: "18 de Junio, 2026",
    Illustration: TalkingPhonesIllustration,
  },
  {
    key: "conocimos",
    icon: "🤝",
    label: "Nos conocimos",
    date: "24 de Junio, 2026",
    Illustration: IceCreamParkIllustration,
  },
  {
    key: "novios",
    icon: "❤️",
    label: "Te hiciste mi novia",
    date: "05 de Julio, 2026",
    highlight: true,
    Illustration: BouquetLiliesIllustration,
  },
];

export default function Dates() {
  const { hablando, conocimos, novios, milestone } = useDates();
  const [showLetter, setShowLetter] = useState(false);
  const counts = { hablando, conocimos, novios };

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
          nuestra historia
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px,4vw,32px)",
            fontWeight: 400,
            color: "var(--text-main)",
          }}
        >
          Nuestras fechas importantes
        </h2>
      </div>

      <div className="desktop-grid">
        {EVENTS.map((ev, i) => {
          const data = counts[ev.key];
          const Illustration = ev.Illustration;
          return (
            <div
              key={ev.key}
              className={`animate-fadeInUp delay-${(i + 1) * 100}`}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginBottom: 8,
                  paddingLeft: 4,
                }}
              >
                {ev.date}
              </p>
              <div
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  marginBottom: 10,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <Illustration
                  style={{
                    width: "100%",
                    height: "clamp(120px,20vw,200px)",
                    display: "block",
                  }}
                />
              </div>
              <div
                className="card"
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderColor: ev.highlight ? "var(--accent)" : undefined,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "var(--tag-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {ev.icon}
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
                      {ev.label}
                    </p>
                    <p
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-body)",
                        marginTop: 2,
                      }}
                    >
                      Día compartido con mi amor
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontSize: 22,
                      fontFamily: "var(--font-display)",
                      color: "var(--counter-num)",
                      fontWeight: 400,
                    }}
                  >
                    {data.days}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    días
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Tarjeta "Y más..." — placeholder para futuros momentos */}
        <div className="animate-fadeInUp delay-400">
          <div
            className="card"
            style={{
              padding: "22px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 6,
              border: "1.5px dashed var(--tag-border)",
              background: "transparent",
              marginBottom: 16,
              minHeight: "clamp(120px,20vw,160px)",
            }}
          >
            <span style={{ fontSize: 24 }}>✨</span>
            <p
              style={{
                fontSize: 14,
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
              }}
            >
              Y más...
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                maxWidth: 220,
              }}
            >
              Seguiremos escribiendo juntos más momentos para recordar
            </p>
          </div>
        </div>
      </div>

      <button
        className="btn-primary animate-fadeInUp delay-400"
        onClick={() => setShowLetter(true)}
        style={{ marginTop: 8, fontSize: 14 }}
      >
        <span>💌</span> Abrir Carta de Amor Secreta ✨
      </button>

      {showLetter && <LetterModal onClose={() => setShowLetter(false)} />}
    </div>
  );
}
