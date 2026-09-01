import LinePill from "../shared/LinePill";

interface Props {
  onBack: () => void;
}

export default function StationHeader({ onBack }: Props) {
  return (
    <div
      style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}
      className="px-4 pt-5 pb-4"
    >
      <button
        onClick={onBack}
        style={{ color: "var(--blue)", fontFamily: "var(--font-body)" }}
        className="flex items-center gap-1 text-sm font-medium mb-3"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12L6 8l4-4" />
        </svg>
        Network
      </button>
      <h1
        style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
        className="text-2xl font-800 mb-2"
      >
        Rajiv Chowk
      </h1>
      <div className="flex items-center gap-2">
        <LinePill name="Yellow Line" color="#F5C518" textColor="#1a1000" />
        <LinePill name="Blue Line" color="#2979FF" />
      </div>
    </div>
  );
}
