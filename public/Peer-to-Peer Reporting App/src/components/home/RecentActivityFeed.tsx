import { RECENT_ACTIVITY } from "../../data/mock";

const categoryIcon: Record<string, string> = {
  "Crowd Surge": "👥",
  "Train Delay": "🕐",
  "Security": "🛡",
  "Gate Closed": "🚧",
};

export default function RecentActivityFeed() {
  return (
    <div className="px-4 pb-6">
      <h2
        style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
        className="text-sm font-700 mb-3 uppercase tracking-wider"
      >
        Recent Activity
      </h2>
      <div
        style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
        className="rounded-xl overflow-hidden"
      >
        {RECENT_ACTIVITY.map((item, i) => (
          <div
            key={item.id}
            style={{
              borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid var(--border)" : "none",
            }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <span className="text-base">{categoryIcon[item.category] ?? "📌"}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
                  className="text-sm font-600 truncate"
                >
                  {item.station}
                </span>
                <span
                  style={{ background: item.lineColor, color: item.lineColor === "#F5C518" ? "#1a1000" : "#fff" }}
                  className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                >
                  ●
                </span>
              </div>
              <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs">
                {item.category}
              </p>
            </div>
            <span style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs shrink-0">
              {item.minutesAgo}m ago
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
