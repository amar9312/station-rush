interface Props {
  message: string;
}

export default function NetworkAlertBanner({ message }: Props) {
  return (
    <div
      style={{
        background: "var(--status-red-bg)",
        borderTop: "1px solid #fca5a5",
        borderBottom: "1px solid #fca5a5",
        color: "var(--status-red)",
      }}
      className="mx-4 mb-3 px-4 py-3 rounded-xl flex items-start gap-2.5"
    >
      <span className="text-base mt-0.5 shrink-0">⚠</span>
      <p style={{ fontFamily: "var(--font-body)" }} className="text-xs font-medium leading-snug">
        {message}
      </p>
    </div>
  );
}
