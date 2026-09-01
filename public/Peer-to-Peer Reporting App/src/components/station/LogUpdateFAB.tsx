interface Props {
  onClick: () => void;
}

export default function LogUpdateFAB({ onClick }: Props) {
  return (
    <div className="sticky bottom-20 flex justify-center px-4 pointer-events-none">
      <button
        onClick={onClick}
        style={{
          background: "var(--blue)",
          color: "#fff",
          fontFamily: "var(--font-display)",
          boxShadow: "0 4px 20px rgba(29,111,242,0.4)",
        }}
        className="pointer-events-auto flex items-center gap-2 px-6 py-3.5 rounded-2xl font-600 text-sm active:scale-95 transition-transform"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M8 2v12M2 8h12" />
        </svg>
        Log Station Update
      </button>
    </div>
  );
}
