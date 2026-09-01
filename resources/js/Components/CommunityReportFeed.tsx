import React from 'react';
import type { CommunityReport } from '../types';
import ReportCard from './ReportCard';

interface Props {
    reports: CommunityReport[];
    onAgree?: (reportId: string | number) => void;
}

export default function CommunityReportFeed({ reports, onAgree }: Props) {
    return (
        <section className="px-4 pb-4">
            <div className="flex items-center justify-between mb-3">
                <h2
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                    className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
                >
                    Community Reports
                </h2>
                <span
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}
                    className="text-xs"
                >
                    {reports.length} active
                </span>
            </div>
            {reports.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {reports.map((r) => (
                        <ReportCard key={r.id} report={r} onAgree={onAgree} />
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        background: 'var(--card)',
                        border: '1.5px dashed var(--border)',
                        color: 'var(--muted)',
                    }}
                    className="rounded-xl p-6 text-center text-xs"
                >
                    No crowd reports yet for this station. Be the first to log an update!
                </div>
            )}
        </section>
    );
}
