import type { LineStatus } from "../../data/mock";

interface Props {
  status: LineStatus;
  label: string;
}

const config: Record<LineStatus, { bg: string; color: string; dot: string }> = {
  normal: { bg: "var(--status-green-bg)", color: "var(--status-green)", dot: "var(--status-green)" },
  moderate: { bg: "var(--status-amber-bg)", color: "var(--status-amber)", dot: "var(--status-amber)" },
  severe: { bg: "var(--status-red-bg)", color: "var(--status-red)", dot: "var(--status-red)" },
};

export default function StatusPill({ status, label }: Props) {
  const c = config[status];
  return (
    <span
      style={{ background: c.bg, color: c.color }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      aria-label={`Status: ${label}`}
    >
      <span
        style={{ background: c.dot }}
        className="w-1.5 h-1.5 rounded-full"
      />
      {label}
    </span>
  );
}
