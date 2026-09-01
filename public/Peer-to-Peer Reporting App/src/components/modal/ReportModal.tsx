import { useState } from "react";
import type { ReportCategory, Severity } from "../../data/mock";

interface Props {
  onClose: () => void;
}

const CATEGORIES: { id: ReportCategory; icon: string }[] = [
  { id: "Crowd Surge", icon: "👥" },
  { id: "Train Delay", icon: "🕐" },
  { id: "Security", icon: "🛡" },
  { id: "Gate Closed", icon: "🚧" },
];

const SEVERITIES: { id: Severity; label: string; sublabel: string }[] = [
  { id: "Minor", label: "Minor", sublabel: "+5m" },
  { id: "Moderate", label: "Moderate", sublabel: "+15m" },
  { id: "Severe", label: "Severe", sublabel: "+30m" },
];

export default function ReportModal({ onClose }: Props) {
  const [category, setCategory] = useState<ReportCategory | null>(null);
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const MAX = 140;
  const canSubmit = category !== null && severity !== null;

  function handleSubmit() {
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(onClose, 1400);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: "rgba(13,27,62,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{ background: "var(--card)", borderRadius: "24px 24px 0 0" }}
        className="animate-slide-up"
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ background: "var(--border)" }} className="w-10 h-1 rounded-full" />
        </div>

        {/* header */}
        <div
          style={{ borderBottom: "1px solid var(--border)" }}
          className="flex items-center justify-between px-5 py-4"
        >
          <div>
            <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }} className="text-xs mb-0.5">
              Report condition at
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }} className="text-lg font-700">
              Rajiv Chowk
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <span className="text-4xl">✅</span>
              <p style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }} className="text-base font-700">
                Report submitted!
              </p>
              <p style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }} className="text-sm text-center">
                Thanks for keeping the network updated.
              </p>
            </div>
          ) : (
            <>
              {/* Category */}
              <div>
                <p style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }} className="text-xs font-700 uppercase tracking-wider mb-3">
                  What are you reporting?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((c) => {
                    const active = category === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        style={{
                          background: active ? "var(--blue)" : "var(--bg)",
                          border: `1.5px solid ${active ? "var(--blue)" : "var(--border)"}`,
                          color: active ? "#fff" : "var(--fg)",
                          fontFamily: "var(--font-body)",
                        }}
                        className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all active:scale-95"
                      >
                        <span className="text-base">{c.icon}</span>
                        {c.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Severity */}
              <div>
                <p style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }} className="text-xs font-700 uppercase tracking-wider mb-3">
                  How severe?
                </p>
                <div className="flex gap-2">
                  {SEVERITIES.map((s) => {
                    const active = severity === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSeverity(s.id)}
                        style={{
                          background: active ? "var(--blue)" : "var(--bg)",
                          border: `1.5px solid ${active ? "var(--blue)" : "var(--border)"}`,
                          color: active ? "#fff" : "var(--fg)",
                          fontFamily: "var(--font-body)",
                        }}
                        className="flex-1 flex flex-col items-center py-3 rounded-xl transition-all active:scale-95"
                      >
                        <span className="text-sm font-600">{s.label}</span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: active ? "rgba(255,255,255,0.7)" : "var(--muted)",
                          }}
                          className="text-xs mt-0.5"
                        >
                          {s.sublabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comment */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }} className="text-xs font-700 uppercase tracking-wider">
                    Add a note <span style={{ color: "var(--muted)" }} className="normal-case font-400">(optional)</span>
                  </p>
                  <span style={{ fontFamily: "var(--font-mono)", color: comment.length > MAX * 0.85 ? "var(--status-red)" : "var(--muted)" }} className="text-xs">
                    {comment.length}/{MAX}
                  </span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value.slice(0, MAX))}
                  placeholder="e.g. Platform 2 is packed, train just left..."
                  style={{
                    background: "var(--bg)",
                    border: "1.5px solid var(--border)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                    resize: "none",
                  }}
                  className="w-full px-4 py-3 rounded-xl text-sm placeholder:text-[var(--muted)] outline-none focus:border-[var(--blue)] transition-colors"
                  rows={3}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  background: canSubmit ? "var(--blue)" : "var(--border)",
                  color: canSubmit ? "#fff" : "var(--muted)",
                  fontFamily: "var(--font-display)",
                }}
                className="w-full py-4 rounded-2xl font-700 text-base transition-all active:scale-[0.98] mb-2"
              >
                Submit Update
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.32,0.72,0,1) forwards;
        }
      `}</style>
    </div>
  );
}
