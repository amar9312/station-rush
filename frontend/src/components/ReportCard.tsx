import React, { useState } from 'react';
import type { CommunityReport } from '../types';

const categoryIcon: Record<string, string> = {
    'Crowd Surge': '👥',
    'Train Delay': '🕐',
    Security: '🛡️',
    'Gate Closed': '🚧',
};

const severityStyle: Record<string, { bg: string; color: string }> = {
    Minor: { bg: 'var(--status-green-bg)', color: 'var(--status-green)' },
    Moderate: { bg: 'var(--status-amber-bg)', color: 'var(--status-amber)' },
    Severe: { bg: 'var(--status-red-bg)', color: 'var(--status-red)' },
};

interface Props {
    report: CommunityReport;
    onAgree?: (reportId: string | number) => void;
}

export default function ReportCard({ report, onAgree }: Props) {
    const [agreed, setAgreed] = useState(false);
    const [count, setCount] = useState(report.agrees);
    const sev = severityStyle[report.severity] ?? severityStyle.Minor;

    function handleAgree() {
        if (agreed) return;
        setAgreed(true);
        setCount((c) => c + 1);
        onAgree?.(report.id);
    }

    return (
        <article
            style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}
            className="rounded-xl p-4 shadow-xs hover:border-blue-200 transition-colors"
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base" aria-hidden>
                        {categoryIcon[report.category] ?? '📌'}
                    </span>
                    <span
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                        className="text-sm font-bold"
                    >
                        {report.category}
                    </span>
                    <span
                        style={{ background: sev.bg, color: sev.color }}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    >
                        {report.severity}
                    </span>
                            {report.platform_direction && (
                                <span
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--muted)',
                                    }}
                                    className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded uppercase font-semibold"
                                >
                                    {report.platform_label
                                        ?? (report.platform_direction === 'platform_1'
                                            ? 'P1'
                                            : report.platform_direction === 'platform_2'
                                              ? 'P2'
                                              : 'Both')}
                                </span>
                            )}
                </div>
                <span
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}
                    className="text-xs shrink-0"
                >
                    {report.minutesAgo}m ago
                </span>
            </div>
            <p
                style={{ color: 'var(--fg)', fontFamily: 'var(--font-body)' }}
                className="text-sm leading-relaxed mb-3 text-slate-800"
            >
                {report.comment}
            </p>
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={handleAgree}
                    style={{
                        background: agreed ? 'var(--blue)' : 'var(--blue-light)',
                        color: agreed ? '#fff' : 'var(--blue)',
                        border: `1px solid ${agreed ? 'var(--blue)' : 'var(--border)'}`,
                        fontFamily: 'var(--font-body)',
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all active:scale-95 cursor-pointer"
                >
                    <span>{agreed ? '✓' : '👍'}</span>
                    <span>Agree ({count})</span>
                </button>
            </div>
        </article>
    );
}
