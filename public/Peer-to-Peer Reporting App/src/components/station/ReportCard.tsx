import { useState } from "react";
import type { CommunityReport } from "../../data/mock";

const categoryIcon: Record<string, string> = {
  "Crowd Surge": "👥",
  "Train Delay": "🕐",
  "Security": "🛡",
  "Gate Closed": "🚧",
};

const severityStyle: Record<string, { bg: string; color: string }> = {
  Minor: { bg: "var(--status-green-bg)", color: "var(--status-green)" },
  Moderate: { bg: "var(--status-amber-bg)", color: "var(--status-amber)" },
  Severe: { bg: "var(--status-red-bg)", color: "var(--status-red)" },
};

interface Props {
  report: CommunityReport;
}

export default function ReportCard({ report }: Props) {
  const [agreed, setAgreed] = useState(false);
  const [count, setCount] = useState(report.agrees);
  const sev = severityStyle[report.severity];

  function handleAgree() {
    if (agreed) return;
    setAgreed(true);
    setCount((c) => c + 1);
  }

  return (
    <div
      style={{ background: "var(--card)", border: "1.5px solid var(--border)" }}
      className="rounded-xl p-4"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{categoryIcon[report.category] ?? "📌"}</span>
          <span
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
            className="text-sm font-600"
          >
            {report.category}
          </span>
          <span
            style={{ background: sev.bg, color: sev.color }}
            className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
          >
            {report.severity}
          </span>
        </div>
        <span style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs shrink-0">
          {report.minutesAgo}m ago
        </span>
      </div>
      <p style={{ color: "var(--fg)", fontFamily: "var(--font-body)" }} className="text-sm leading-snug mb-3">
        {report.comment}
      </p>
      <button
        onClick={handleAgree}
        style={{
          background: agreed ? "var(--blue)" : "var(--blue-light)",
          color: agreed ? "#fff" : "var(--blue)",
          border: `1px solid ${agreed ? "var(--blue)" : "var(--border)"}`,
          fontFamily: "var(--font-body)",
        }}
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
      >
        <span>{agreed ? "✓" : "👍"}</span>
        Agree ({count})
      </button>
    </div>
  );
}
