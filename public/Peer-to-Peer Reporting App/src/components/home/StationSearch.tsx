interface Props {
  onStationSelect: () => void;
}

export default function StationSearch({ onStationSelect }: Props) {
  return (
    <div className="px-4 pb-3">
      <button
        onClick={onStationSelect}
        style={{
          background: "var(--card)",
          border: "1.5px solid var(--border)",
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all"
        aria-label="Search station or line"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="7" cy="7" r="5" />
          <path d="M14 14l-3-3" />
        </svg>
        <span>Search station or line...</span>
      </button>
    </div>
  );
}
