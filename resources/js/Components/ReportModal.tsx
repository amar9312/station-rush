import React, { useState } from 'react';
import type {
    ReportCategory,
    Severity,
    RushLevel,
    CrowdReportPayload,
    Station,
} from '../types';

interface Props {
    station?: Station;
    onClose: () => void;
    onSubmitReport?: (payload: CrowdReportPayload) => void;
}

const CATEGORIES: { id: ReportCategory; icon: string }[] = [
    { id: 'Crowd Surge', icon: '👥' },
    { id: 'Train Delay', icon: '🕐' },
    { id: 'Security', icon: '🛡️' },
    { id: 'Gate Closed', icon: '🚧' },
];

const SEVERITIES: {
    id: Severity;
    label: string;
    sublabel: string;
    rush: RushLevel;
}[] = [
    { id: 'Minor', label: 'Low / Minor', sublabel: '+5m queue', rush: 'low' },
    { id: 'Moderate', label: 'Moderate Rush', sublabel: '+15m queue', rush: 'normal' },
    { id: 'Severe', label: 'Severe Rush', sublabel: '+30m delay', rush: 'heavy' },
];

export default function ReportModal({
    station,
    onClose,
    onSubmitReport,
}: Props) {
    const [category, setCategory] = useState<ReportCategory | null>('Crowd Surge');
    const [severity, setSeverity] = useState<Severity | null>(null);
    const [platformDirection, setPlatformDirection] = useState<'platform_1' | 'platform_2' | 'both'>('both');
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const stationName = station?.name ?? 'Rajiv Chowk';
    const MAX = 140;
    const canSubmit = category !== null && severity !== null;

    function handleSubmit() {
        if (!canSubmit) return;

        const selectedSeverityObj = SEVERITIES.find((s) => s.id === severity);
        const payload: CrowdReportPayload = {
            station_id: station?.id,
            station_slug: station?.slug,
            category,
            severity,
            rush_level: selectedSeverityObj?.rush ?? 'normal',
            platform_direction: platformDirection,
            comment: comment.trim() || undefined,
        };

        onSubmitReport?.(payload);
        setSubmitted(true);
        setTimeout(() => {
            onClose();
        }, 1300);
    }

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col justify-end bg-[#0D1B3E]/60 backdrop-blur-xs transition-opacity"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                style={{
                    background: 'var(--card)',
                    borderRadius: '24px 24px 0 0',
                    borderTop: '1px solid var(--border)',
                }}
                className="w-full max-w-[430px] mx-auto animate-slide-up max-h-[90vh] overflow-y-auto shadow-2xl"
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div
                        style={{ background: 'var(--border)' }}
                        className="w-10 h-1.5 rounded-full"
                    />
                </div>

                {/* Header */}
                <div
                    style={{ borderBottom: '1px solid var(--border)' }}
                    className="flex items-center justify-between px-5 py-4"
                >
                    <div>
                        <p
                            style={{
                                color: 'var(--muted)',
                                fontFamily: 'var(--font-mono)',
                            }}
                            className="text-xs mb-0.5"
                        >
                            Report live conditions at
                        </p>
                        <h2
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--fg)',
                            }}
                            className="text-lg font-bold"
                        >
                            {stationName}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: 'var(--bg)',
                            color: 'var(--muted)',
                            border: '1px solid var(--border)',
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold active:scale-95 transition-transform"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="px-5 py-5 flex flex-col gap-5">
                    {submitted ? (
                        <div className="flex flex-col items-center gap-3 py-8 animate-fade-in">
                            <span className="text-5xl">✅</span>
                            <p
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--fg)',
                                }}
                                className="text-lg font-bold"
                            >
                                Report Submitted!
                            </p>
                            <p
                                style={{
                                    color: 'var(--muted)',
                                    fontFamily: 'var(--font-body)',
                                }}
                                className="text-xs text-center max-w-xs leading-relaxed"
                            >
                                Thanks for updating commuters across the DMRC network!
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Step 1: Category Selection */}
                            <div>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--fg)',
                                    }}
                                    className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between"
                                >
                                    <span>1. What are you observing?</span>
                                    <span className="text-[11px] font-normal text-[var(--muted)] normal-case">
                                        Tap to select
                                    </span>
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {CATEGORIES.map((c) => {
                                        const active = category === c.id;
                                        return (
                                            <button
                                                key={c.id}
                                                type="button"
                                                onClick={() => setCategory(c.id)}
                                                style={{
                                                    background: active
                                                        ? 'var(--blue)'
                                                        : 'var(--bg)',
                                                    border: `1.5px solid ${
                                                        active
                                                            ? 'var(--blue)'
                                                            : 'var(--border)'
                                                    }`,
                                                    color: active ? '#fff' : 'var(--fg)',
                                                    fontFamily: 'var(--font-body)',
                                                }}
                                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-xs"
                                            >
                                                <span className="text-base">{c.icon}</span>
                                                <span className="truncate">{c.id}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Step 2: Severity / Rush Level */}
                            <div>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--fg)',
                                    }}
                                    className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between"
                                >
                                    <span>2. Crowd Rush Level</span>
                                    <span className="text-[11px] font-normal text-[var(--muted)] normal-case">
                                        Estimated impact
                                    </span>
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {SEVERITIES.map((s) => {
                                        const active = severity === s.id;
                                        return (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => setSeverity(s.id)}
                                                style={{
                                                    background: active
                                                        ? 'var(--blue)'
                                                        : 'var(--bg)',
                                                    border: `1.5px solid ${
                                                        active
                                                            ? 'var(--blue)'
                                                            : 'var(--border)'
                                                    }`,
                                                    color: active ? '#fff' : 'var(--fg)',
                                                    fontFamily: 'var(--font-body)',
                                                }}
                                                className="flex flex-col items-center py-2.5 px-1 rounded-xl transition-all active:scale-95 cursor-pointer shadow-xs"
                                            >
                                                <span className="text-xs font-bold text-center leading-tight">
                                                    {s.label}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: 'var(--font-mono)',
                                                        color: active
                                                            ? 'rgba(255,255,255,0.85)'
                                                            : 'var(--muted)',
                                                    }}
                                                    className="text-[10px] mt-1"
                                                >
                                                    {s.sublabel}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Platform / Direction Selection */}
                            <div>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--fg)',
                                    }}
                                    className="text-xs font-bold uppercase tracking-wider mb-2"
                                >
                                    Platform / Direction
                                </p>
                                <div className="grid grid-cols-3 gap-1.5 text-xs">
                                    {[
                                        { id: 'platform_1', label: 'Platform 1' },
                                        { id: 'platform_2', label: 'Platform 2' },
                                        { id: 'both', label: 'Both / Concourse' },
                                    ].map((p) => {
                                        const active = platformDirection === p.id;
                                        return (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() =>
                                                    setPlatformDirection(
                                                        p.id as 'platform_1' | 'platform_2' | 'both',
                                                    )
                                                }
                                                style={{
                                                    background: active
                                                        ? 'var(--blue-light)'
                                                        : 'var(--bg)',
                                                    border: `1.5px solid ${
                                                        active
                                                            ? 'var(--blue)'
                                                            : 'var(--border)'
                                                    }`,
                                                    color: active
                                                        ? 'var(--blue)'
                                                        : 'var(--fg)',
                                                    fontFamily: 'var(--font-mono)',
                                                }}
                                                className="py-2 px-1 rounded-lg font-semibold text-center truncate transition-all cursor-pointer"
                                            >
                                                {p.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Note / Comment */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            color: 'var(--fg)',
                                        }}
                                        className="text-xs font-bold uppercase tracking-wider"
                                    >
                                        Add Note{' '}
                                        <span
                                            style={{ color: 'var(--muted)' }}
                                            className="normal-case font-normal"
                                        >
                                            (Optional)
                                        </span>
                                    </p>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color:
                                                comment.length > MAX * 0.85
                                                    ? 'var(--status-red)'
                                                    : 'var(--muted)',
                                        }}
                                        className="text-[11px]"
                                    >
                                        {comment.length}/{MAX}
                                    </span>
                                </div>
                                <textarea
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value.slice(0, MAX))
                                    }
                                    placeholder="e.g., Platform 2 is packed, train just passed without room to board..."
                                    style={{
                                        background: 'var(--bg)',
                                        border: '1.5px solid var(--border)',
                                        color: 'var(--fg)',
                                        fontFamily: 'var(--font-body)',
                                        resize: 'none',
                                    }}
                                    className="w-full px-3.5 py-2.5 rounded-xl text-sm placeholder:text-[var(--muted)] outline-none focus:border-[var(--blue)] focus:ring-1 focus:ring-[var(--blue)] transition-colors"
                                    rows={2}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!canSubmit}
                                style={{
                                    background: canSubmit
                                        ? 'var(--blue)'
                                        : 'var(--border)',
                                    color: canSubmit ? '#fff' : 'var(--muted)',
                                    fontFamily: 'var(--font-display)',
                                    boxShadow: canSubmit
                                        ? '0 4px 16px rgba(29, 111, 242, 0.4)'
                                        : 'none',
                                }}
                                className="w-full py-3.5 rounded-xl font-bold text-base transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed mb-2"
                            >
                                Submit Rush Update
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
