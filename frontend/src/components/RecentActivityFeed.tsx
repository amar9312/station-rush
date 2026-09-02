import React from 'react';
import type { ActivityItem } from '../types';

const categoryIcon: Record<string, string> = {
    'Crowd Surge': '👥',
    'Train Delay': '🕐',
    Security: '🛡️',
    'Gate Closed': '🚧',
};

interface Props {
    activities: ActivityItem[];
    onSelectStation?: (stationName: string) => void;
}

export default function RecentActivityFeed({ activities, onSelectStation }: Props) {
    return (
        <section className="px-4 pb-6">
            <h2
                style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3"
            >
                Recent Activity
            </h2>
            <div
                style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}
                className="rounded-xl overflow-hidden shadow-xs"
            >
                {activities.map((item, i) => (
                    <div
                        key={item.id}
                        onClick={() => onSelectStation?.(item.station)}
                        style={{
                            borderBottom:
                                i < activities.length - 1
                                    ? '1px solid var(--border)'
                                    : 'none',
                        }}
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                            onSelectStation ? 'hover:bg-[var(--blue-light)] cursor-pointer' : ''
                        }`}
                    >
                        <span className="text-base select-none" aria-hidden>
                            {categoryIcon[item.category] ?? '📌'}
                        </span>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--fg)',
                                    }}
                                    className="text-sm font-semibold truncate"
                                >
                                    {item.station}
                                </span>
                                <span
                                    style={{
                                        background: item.lineColor,
                                        color:
                                            item.lineColor === '#F5C518'
                                                ? '#1a1000'
                                                : '#fff',
                                    }}
                                    className="text-[10px] font-bold px-1.5 py-0.2 rounded-full"
                                >
                                    ●
                                </span>
                            </div>
                            <p
                                style={{
                                    color: 'var(--muted)',
                                    fontFamily: 'var(--font-mono)',
                                }}
                                className="text-xs"
                            >
                                {item.category}
                            </p>
                        </div>
                        <span
                            style={{
                                color: 'var(--muted)',
                                fontFamily: 'var(--font-mono)',
                            }}
                            className="text-xs shrink-0"
                        >
                            {item.minutesAgo}m ago
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
