export default function AppHeader() {
  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-3">
      <div>
        <h1
          style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          className="text-2xl font-800 tracking-tight leading-none"
        >
          Station<span style={{ color: "var(--blue)" }}>Rush</span>
        </h1>
        <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs mt-0.5">
          DMRC Live Network
        </p>
      </div>
      <div
        style={{
          background: "var(--blue-light)",
          border: "1px solid var(--border)",
          color: "var(--blue)",
          fontFamily: "var(--font-mono)",
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
      >
        <span>☁</span>
        <span>Connaught Place · Light Rain</span>
      </div>
    </div>
  );
}
