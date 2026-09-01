import React from 'react';
import type { TimetableEntry } from '../types';

interface Props {
    timetable: TimetableEntry[];
}

export default function BaselineTimetable({ timetable }: Props) {
    return (
        <section className="px-4 pb-4">
            <h2
                style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3"
            >
                Scheduled Arrivals
            </h2>
            <div
                style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}
                className="rounded-xl overflow-hidden shadow-xs"
            >
                {timetable.map((t, i) => (
                    <div
                        key={i}
                        style={{
                            borderBottom:
                                i < timetable.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                        className="flex items-center gap-3 px-4 py-3"
                    >
                        <span
                            style={{
                                background: t.lineColor,
                                color: t.lineColor === '#F5C518' ? '#1a1000' : '#fff',
                            }}
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            aria-hidden
                        />
                        <div className="flex-1 min-w-0">
                            <p
                                style={{
                                    color: 'var(--fg)',
                                    fontFamily: 'var(--font-body)',
                                }}
                                className="text-sm font-semibold truncate"
                            >
                                {t.destination}
                            </p>
                            <p
                                style={{
                                    color: 'var(--muted)',
                                    fontFamily: 'var(--font-mono)',
                                }}
                                className="text-xs"
                            >
                                {t.lineName} · {t.platform}
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <p
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--fg)',
                                }}
                                className="text-sm font-bold"
                            >
                                {t.scheduledTime}
                            </p>
                            <p
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color:
                                        t.status === 'Delayed'
                                            ? 'var(--status-red)'
                                            : 'var(--status-green)',
                                }}
                                className="text-xs font-semibold"
                            >
                                {t.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
