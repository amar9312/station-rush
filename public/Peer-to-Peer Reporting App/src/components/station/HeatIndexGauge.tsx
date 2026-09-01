type HeatLevel = "green" | "amber" | "red";

const levelConfig: Record<HeatLevel, {
  label: string;
  sublabel: string;
  bg: string;
  border: string;
  color: string;
  arcColor: string;
  fillDeg: number;
}> = {
  green: {
    label: "Normal",
    sublabel: "Conditions are clear",
    bg: "var(--status-green-bg)",
    border: "#86efac",
    color: "var(--status-green)",
    arcColor: "#16A34A",
    fillDeg: 60,
  },
  amber: {
    label: "Moderate Surge",
    sublabel: "Platform 1 crowding reported",
    bg: "var(--status-amber-bg)",
    border: "#fcd34d",
    color: "var(--status-amber)",
    arcColor: "#D97706",
    fillDeg: 120,
  },
  red: {
    label: "Severe Crowding",
    sublabel: "Platform 2 Overcrowded · 4 reports in last 10m",
    bg: "var(--status-red-bg)",
    border: "#fca5a5",
    color: "var(--status-red)",
    arcColor: "#DC2626",
    fillDeg: 170,
  },
};

export default function HeatIndexGauge() {
  const level: HeatLevel = "red";
  const cfg = levelConfig[level];

  const r = 54;
  const cx = 80;
  const cy = 80;
  const startAngle = -180;
  const totalDeg = 180;

  function polarToXY(deg: number) {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function arcPath(fromDeg: number, toDeg: number) {
    const s = polarToXY(fromDeg);
    const e = polarToXY(toDeg);
    const large = toDeg - fromDeg > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  const endAngle = startAngle + (cfg.fillDeg / totalDeg) * totalDeg;
  const needleAngle = startAngle + (cfg.fillDeg / totalDeg) * totalDeg;
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleTipX = cx + (r - 10) * Math.cos(needleRad);
  const needleTipY = cy + (r - 10) * Math.sin(needleRad);

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
      }}
      className="mx-4 mt-4 rounded-2xl p-4"
    >
      <div className="flex items-center justify-between mb-1">
        <span
          style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          className="text-sm font-700 uppercase tracking-wider"
        >
          Heat Index
        </span>
        <span
          style={{
            background: cfg.color,
            color: "#fff",
            fontFamily: "var(--font-mono)",
          }}
          className="text-xs font-medium px-2 py-0.5 rounded-full"
        >
          LIVE
        </span>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <svg width="160" height="90" viewBox="0 0 160 90" aria-hidden>
          <path
            d={arcPath(startAngle, startAngle + totalDeg)}
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={arcPath(startAngle, endAngle)}
            fill="none"
            stroke={cfg.arcColor}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <line
            x1={cx}
            y1={cy}
            x2={needleTipX}
            y2={needleTipY}
            stroke={cfg.color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy} r="4" fill={cfg.color} />
          <text x="18" y="88" fontSize="9" fill="var(--status-green)" fontFamily="var(--font-mono)" fontWeight="500">Low</text>
          <text x="67" y="26" fontSize="9" fill="var(--status-amber)" fontFamily="var(--font-mono)" fontWeight="500" textAnchor="middle">Med</text>
          <text x="135" y="88" fontSize="9" fill="var(--status-red)" fontFamily="var(--font-mono)" fontWeight="500" textAnchor="end">High</text>
        </svg>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: "var(--font-display)", color: cfg.color }} className="text-lg font-800 leading-tight">
            {cfg.label}
          </p>
          <p style={{ color: "var(--fg)", fontFamily: "var(--font-body)" }} className="text-xs mt-1 leading-snug">
            {cfg.sublabel}
          </p>
          <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs mt-2">
            Based on 9 reports
          </p>
        </div>
      </div>
    </div>
  );
}
