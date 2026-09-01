import { TIMETABLE } from "../../data/mock";

export default function BaselineTimetable() {
  return (
    <div className="px-4 pb-4">
      <h2
        style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
        className="text-sm font-700 uppercase tracking-wider mb-3"
      >
        Scheduled Arrivals
      </h2>
      <div
        style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
        className="rounded-xl overflow-hidden"
      >
        {TIMETABLE.map((t, i) => (
          <div
            key={i}
            style={{ borderBottom: i < TIMETABLE.length - 1 ? "1px solid var(--border)" : "none" }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <span
              style={{ background: t.lineColor, color: t.lineColor === "#F5C518" ? "#1a1000" : "#fff" }}
              className="w-2 h-2 rounded-full shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p style={{ color: "var(--fg)", fontFamily: "var(--font-body)" }} className="text-sm font-medium truncate">
                {t.destination}
              </p>
              <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs">
                {t.lineName} · {t.platform}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p style={{ fontFamily: "var(--font-mono)", color: "var(--fg)" }} className="text-sm font-medium">
                {t.scheduledTime}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  color: t.status === "Delayed" ? "var(--status-red)" : "var(--status-green)",
                }}
                className="text-xs"
              >
                {t.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
