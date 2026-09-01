import { useState } from "react";
import HomeScreen from "./components/home/HomeScreen";
import StationScreen from "./components/station/StationScreen";
import ReportModal from "./components/modal/ReportModal";

type Screen = "home" | "station";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="relative flex flex-col"
      style={{
        width: "100%",
        maxWidth: "430px",
        height: "100%",
        margin: "0 auto",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      {/* Screen content */}
      <div className="flex-1 overflow-hidden relative">
        {screen === "home" && (
          <HomeScreen onLinePress={() => setScreen("station")} />
        )}
        {screen === "station" && (
          <StationScreen
            onBack={() => setScreen("home")}
            onLogUpdate={() => setModalOpen(true)}
          />
        )}
      </div>

      {/* Bottom nav */}
      <nav
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-body)",
        }}
        className="flex shrink-0"
      >
        <button
          onClick={() => setScreen("home")}
          style={{ color: screen === "home" ? "var(--blue)" : "var(--muted)" }}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
            <path d="M8 18V12h4v6" />
          </svg>
          Network
        </button>
        <button
          onClick={() => setScreen("station")}
          style={{ color: screen === "station" ? "var(--blue)" : "var(--muted)" }}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="7" />
            <path d="M10 7v3l2 2" />
          </svg>
          Station
        </button>
        <button
          onClick={() => { setScreen("station"); setModalOpen(true); }}
          style={{ color: "var(--muted)" }}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors"
        >
          <div
            style={{ background: "var(--blue)" }}
            className="w-8 h-8 rounded-full flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M8 2v12M2 8h12" />
            </svg>
          </div>
          Report
        </button>
      </nav>

      {/* Modal overlay */}
      {modalOpen && <ReportModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
