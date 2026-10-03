import { useState, useEffect, useCallback } from "react";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dates from "./pages/Dates";
import Settings from "./pages/Settings";
import { House, CalendarDays, Settings as SettingsIcon } from "lucide-react";

const TABS = [
  { id: "home", Icon: House, label: "Inicio" },
  { id: "dates", Icon: CalendarDays, label: "Calendario" },
  { id: "settings", Icon: SettingsIcon, label: "Ajustes" },
];

const AUTH_KEY = "app_auth";
const USER_KEY = "app_user";

const THEMES = ["teal", "pink"];
const DEFAULT_THEME = "pink";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [tab, setTab] = useState("home");

  // Solo acepta temas válidos; si no hay uno guardado (o es raro), usa rosa
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return THEMES.includes(saved) ? saved : DEFAULT_THEME;
  });

  const [user, setUser] = useState(() => localStorage.getItem(USER_KEY));
  // Si ya estaba logueado antes de este cambio y no hay usuario guardado,
  // pide iniciar sesión una vez más para saber quién es.
  const [authed, setAuthed] = useState(
    () =>
      localStorage.getItem(AUTH_KEY) === "true" &&
      !!localStorage.getItem(USER_KEY),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = useCallback((t) => {
    if (THEMES.includes(t)) setTheme(t);
  }, []);
  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  // Login debe llamar onSuccess("Cariño") o onSuccess("Amor")
  const handleLoginSuccess = useCallback((nombre) => {
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(USER_KEY, nombre);
    setUser(nombre);
    setAuthed(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setAuthed(false);
    setTab("home");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100%",
        background: "var(--bg)",
        transition: "background 0.4s",
        overflow: "hidden",
      }}
    >
      {showSplash && <Splash onDone={handleSplashDone} />}

      {!showSplash && !authed && <Login onSuccess={handleLoginSuccess} />}

      {!showSplash && authed && (
        <>
          {/* CONTENIDO — crece, scrollea, centrado en desktop */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <div className="page-wrapper">
              {tab === "home" && <Home user={user} />}
              {tab === "dates" && <Dates />}
              {tab === "settings" && (
                <Settings
                  theme={theme}
                  onThemeChange={handleTheme}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>

          {/* NAV — siempre abajo, ancho completo */}
          <nav
            aria-label="Navegación principal"
            style={{
              flexShrink: 0,
              width: "100%",
              background: "var(--bg-card)",
              borderTop: "0.5px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.4s, border-color 0.4s",
            }}
          >
            {/* Inner del nav también centrado y con max-width */}
            <div
              style={{
                display: "flex",
                width: "100%",
                maxWidth: 900,
                height: 60,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  aria-label={t.label}
                  aria-current={tab === t.id ? "page" : undefined}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px 0",
                    color:
                      tab === t.id
                        ? "var(--nav-active)"
                        : "var(--nav-inactive)",
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    fontWeight: tab === t.id ? 500 : 400,
                    transition: "color 0.2s",
                    height: "100%",
                  }}
                >
                  <t.Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
