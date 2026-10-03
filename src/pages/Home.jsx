import { useState } from "react";
import CherryIllustration from "../pages/CherryIllustration";
import LetterModal from "./LetterModal";
import Recuerdos from "../pages/Recuerdos";
import useDates from "../hooks/useDates";
import Metas from "../pages/Metas";
import Playlist from "../pages/Playlist";
import Notitas from "../pages/Notitas";
import {
  Images,
  Target,
  Music,
  StickyNote,
  Plus,
  CalendarDays,
  Mail,
  Heart,
} from "lucide-react";

export default function Home({ user }) {
  const data = useDates();
  const novios = data.novios;
  const hablando = data.hablando;
  const milestone = data.milestone;
  const cumpleElla = data.cumpleElla;
  const cumpleEl = data.cumpleEl;
  const [showNotes, setShowNotes] = useState(false);

  const [showLetter, setShowLetter] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const personas = [
    cumpleElla &&
      cumpleEl && {
        emoji: cumpleElla.emoji || "🏺",
        nombre: "Ella",
        fecha: "1 de febrero, 2006",
        edad: cumpleElla.edad ?? "?",
        signo: cumpleElla.signo || "Acuario",
        daysTo: cumpleElla.proximoBD ? cumpleElla.proximoBD.daysTo : null,
      },
    cumpleEl && {
      emoji: cumpleEl.emoji || "🦁",
      nombre: "Tú",
      fecha: "2 de agosto, 2004",
      edad: cumpleEl.edad ?? "?",
      signo: cumpleEl.signo || "Leo",
      daysTo: cumpleEl.proximoBD ? cumpleEl.proximoBD.daysTo : null,
    },
  ].filter(Boolean);

  const ellaHoyBD =
    cumpleElla && cumpleElla.proximoBD && cumpleElla.proximoBD.daysTo === 0;
  const elHoyBD =
    cumpleEl && cumpleEl.proximoBD && cumpleEl.proximoBD.daysTo === 0;

  return (
    <div className="page animate-fadeIn">
      {/* Header */}
      <div
        className="desktop-full"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
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
            para ti
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 400,
              color: "var(--text-main)",
            }}
          >
            Nuestra Historia
          </h1>
        </div>
        <div
          className="animate-heartbeat"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--tag-bg)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          🌸
        </div>
      </div>

      {/* Banner cumpleaños ella */}
      {ellaHoyBD && (
        <div
          className="animate-fadeInUp desktop-full"
          style={{
            background:
              "linear-gradient(135deg, var(--tag-bg), var(--bg-card))",
            border: "1px solid var(--tag-border)",
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 22, marginBottom: 4 }}>🎂🎉</p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              color: "var(--accent)",
            }}
          >
            ¡Hoy es tu cumpleaños!
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-muted)",
              marginTop: 4,
            }}
          >
            Feliz cumpleaños mi amor 🌸
          </p>
        </div>
      )}

      {/* Banner cumpleaños él */}
      {elHoyBD && (
        <div
          className="animate-fadeInUp desktop-full"
          style={{
            background:
              "linear-gradient(135deg, var(--tag-bg), var(--bg-card))",
            border: "1px solid var(--tag-border)",
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 22, marginBottom: 4 }}>🎂🦁</p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              color: "var(--accent)",
            }}
          >
            ¡Hoy es tu cumpleaños!
          </p>
        </div>
      )}

      {/* Grid responsivo */}
      <div className="desktop-grid">
        {/* Ilustración cerezos */}
        <div
          className="desktop-full animate-fadeInUp delay-100"
          style={{
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 4,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          }}
        >
          <CherryIllustration
            style={{
              width: "100%",
              height: "clamp(160px, 30vw, 280px)",
              display: "block",
            }}
          />
        </div>

        {/* Subtítulo */}
        <div
          className="desktop-full animate-fadeInUp delay-200"
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            marginBottom: 16,
          }}
        >
          Celebrando cada latido juntos
        </div>

        {/* Columna izquierda */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Contador principal */}
          <div
            className="card animate-fadeInUp delay-300"
            style={{ padding: "22px 20px" }}
          >
            <p
              style={{
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
                textAlign: "center",
                marginBottom: 14,
              }}
            >
              llevamos juntos
            </p>

            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(48px, 8vw, 72px)",
                  fontWeight: 400,
                  color: "var(--counter-num)",
                  lineHeight: 1,
                }}
              >
                {novios.days}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 3vw, 28px)",
                  color: "var(--counter-unit)",
                  marginLeft: 8,
                }}
              >
                días
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontStyle: "italic",
                color: "var(--text-muted)",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              "Cada segundo a tu lado es un regalo del cielo."
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 28 }}>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                    marginBottom: 3,
                  }}
                >
                  ❤️
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-sub)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {novios.months} {novios.months === 1 ? "mes" : "meses"}
                </p>
              </div>
              <div style={{ width: 0.5, background: "var(--border)" }} />
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                    marginBottom: 3,
                  }}
                >
                  ✨
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-sub)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {novios.weeks} semanas
                </p>
              </div>
            </div>
          </div>

          {/* Botón Nuestros recuerdos */}
          <button
            onClick={() => setShowMemories(true)}
            className="animate-fadeInUp delay-400"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "14px 16px",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Images
              size={22}
              strokeWidth={1.75}
              style={{ color: "var(--accent)", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                Nuestros recuerdos
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginTop: 2,
                }}
              >
                Toca para ver nuestras fotos juntos
              </p>
            </div>
          </button>

          {/* Botón Metas juntos */}
          <button
            onClick={() => setShowGoals(true)}
            className="animate-fadeInUp delay-400"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "14px 16px",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Target
              size={22}
              strokeWidth={1.75}
              style={{ color: "var(--accent)", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                Nuestras metas
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginTop: 2,
                }}
              >
                Lo que soñamos lograr juntos
              </p>
            </div>
          </button>

          {/* Botón Playlist */}
          <button
            onClick={() => setShowPlaylist(true)}
            className="animate-fadeInUp delay-400"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "14px 16px",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <Music
              size={22}
              strokeWidth={1.75}
              style={{ color: "var(--accent)", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                Nuestra playlist
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginTop: 2,
                }}
              >
                Las canciones que nos representan
              </p>
            </div>
          </button>

          {/* Botón Notitas */}
          <button
            onClick={() => setShowNotes(true)}
            className="animate-fadeInUp delay-400"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "14px 16px",
              cursor: "pointer",
              textAlign: "left",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <StickyNote
              size={22}
              strokeWidth={1.75}
              style={{ color: "var(--accent)", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                Notitas sorpresa
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginTop: 2,
                }}
              >
                Deja una y mira las que te dejaron
              </p>
            </div>
          </button>

          {/* Y más... — placeholder para futuros momentos, siempre al final de lo nuevo */}
          <div
            className="animate-fadeInUp delay-400"
            style={{
              border: "1.5px dashed var(--tag-border)",
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Plus
              size={22}
              strokeWidth={1.75}
              style={{ color: "var(--accent)", flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  color: "var(--accent)",
                }}
              >
                Y más...
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  marginTop: 2,
                }}
              >
                Seguiremos agregando momentos juntos
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Contador hablando */}
          <div
            className="card animate-fadeInUp delay-300"
            style={{ padding: "18px 20px" }}
          >
            <p
              style={{
                fontSize: 9,
                color: "var(--text-muted)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              hablando desde
            </p>
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  color: "var(--counter-unit)",
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                {hablando.days}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  color: "var(--text-muted)",
                  marginLeft: 6,
                }}
              >
                días
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "var(--text-muted)",
                textAlign: "center",
                marginTop: 6,
              }}
            >
              desde el 18 de junio 💬
            </p>
          </div>

          {/* Próximo hito */}
          {milestone && milestone.daysTo > 0 && (
            <div
              className="animate-fadeInUp delay-400"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "var(--tag-bg)",
                border: "0.5px solid var(--tag-border)",
                borderRadius: 14,
                padding: "14px 16px",
              }}
            >
              <CalendarDays
                size={22}
                strokeWidth={1.75}
                style={{ color: "var(--accent)", flexShrink: 0 }}
              />
              <div>
                <p
                  style={{
                    fontSize: 9,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  próximo mes juntos
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--accent-text)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    marginTop: 2,
                  }}
                >
                  {milestone.label} · en {milestone.daysTo}{" "}
                  {milestone.daysTo === 1 ? "día" : "días"}
                </p>
              </div>
            </div>
          )}

          {/* Cumpleaños */}
          {personas.length > 0 && (
            <div
              className="card animate-fadeInUp delay-400"
              style={{ padding: 18 }}
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
                Cumpleaños
              </p>

              {personas.map((p, i) => (
                <div key={i}>
                  {i > 0 && (
                    <div
                      style={{
                        height: 0.5,
                        background: "var(--border)",
                        margin: "14px 0",
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "var(--tag-bg)",
                        border: "0.5px solid var(--tag-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {p.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: 4,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "var(--text-main)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {p.nombre} · {p.signo}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: "var(--accent)",
                            fontFamily: "var(--font-body)",
                            fontWeight: 500,
                          }}
                        >
                          {p.edad} años
                        </p>
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          fontFamily: "var(--font-body)",
                          marginTop: 3,
                        }}
                      >
                        {p.fecha}
                      </p>
                      {p.daysTo !== null && (
                        <div
                          style={{
                            marginTop: 8,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            background: "var(--tag-bg)",
                            border: "0.5px solid var(--tag-border)",
                            borderRadius: 8,
                            padding: "4px 10px",
                          }}
                        >
                          <span style={{ fontSize: 11 }}>🎂</span>
                          <span
                            style={{
                              fontSize: 11,
                              color: "var(--tag-text)",
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {p.daysTo === 0
                              ? "¡Hoy es su cumpleaños! 🎉"
                              : `próximo cumpleaños en ${p.daysTo} días`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Compatibilidad */}
          <div
            className="animate-fadeInUp delay-400"
            style={{
              background: "var(--tag-bg)",
              border: "0.5px solid var(--tag-border)",
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 26 }}>🦁</span>
              <span style={{ fontSize: 16, color: "var(--text-muted)" }}>
                +
              </span>
              <span style={{ fontSize: 26 }}>🏺</span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  color: "var(--accent)",
                  marginLeft: 4,
                }}
              >
                Leo &amp; Acuario
              </p>
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 12,
                fontStyle: "italic",
                color: "var(--text-sub)",
                lineHeight: 1.8,
              }}
            >
              Signos opuestos, atracción magnética. Tú eres el fuego, ella es el
              viento que lo aviva. Juntos son intensidad y libertad: tu pasión
              la impulsa a soñar más alto, y su forma única de ver el mundo te
              enseña a sentir distinto cada día. Dicen que Leo y Acuario chocan…
              pero cuando conectan, crean algo que ningún otro signo logra
              igualar.
            </p>
          </div>

          {/* Botón carta */}
          <div className="animate-fadeInUp delay-500">
            <button
              className="btn-primary"
              onClick={() => setShowLetter(true)}
              aria-label="Abrir carta de amor"
              style={{ fontSize: 14, padding: "14px 24px" }}
            >
              💌 Abrir carta de amor
            </button>
          </div>
        </div>
      </div>

      {showLetter && <LetterModal onClose={() => setShowLetter(false)} />}
      <Recuerdos open={showMemories} onClose={() => setShowMemories(false)} />
      <Metas open={showGoals} onClose={() => setShowGoals(false)} />
      <Playlist open={showPlaylist} onClose={() => setShowPlaylist(false)} />
      <Notitas me={user} open={showNotes} onClose={() => setShowNotes(false)} />
    </div>
  );
}
