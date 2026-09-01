import { COMMUNITY_REPORTS } from "../../data/mock";
import ReportCard from "./ReportCard";

export default function CommunityReportFeed() {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h2
          style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          className="text-sm font-700 uppercase tracking-wider"
        >
          Community Reports
        </h2>
        <span style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs">
          {COMMUNITY_REPORTS.length} active
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {COMMUNITY_REPORTS.map((r) => (
          <ReportCard key={r.id} report={r} />
        ))}
      </div>
    </div>
  );
}
