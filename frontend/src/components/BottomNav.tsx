import React from 'react';

interface Props {
    activeScreen: 'network' | 'station';
    onSelectScreen: (screen: 'network' | 'station') => void;
    onOpenReport: () => void;
}

export default function BottomNav({ activeScreen, onSelectScreen, onOpenReport }: Props) {
    return (
        <nav
            style={{
                background: 'var(--card)',
                borderTop: '1px solid var(--border)',
                fontFamily: 'var(--font-body)',
            }}
            className="sticky bottom-0 z-40 flex items-center justify-between w-full shrink-0 shadow-lg px-2 pb-[env(safe-area-inset-bottom,0px)]"
        >
            <button
                type="button"
                onClick={() => onSelectScreen('network')}
                style={{ color: activeScreen === 'network' ? 'var(--blue)' : 'var(--muted)' }}
                className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors focus:outline-none"
                aria-label="Network Overview"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                    <path d="M8 18V12h4v6" />
                </svg>
                Network
            </button>

            <button
                type="button"
                onClick={() => onSelectScreen('station')}
                style={{ color: activeScreen === 'station' ? 'var(--blue)' : 'var(--muted)' }}
                className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors focus:outline-none"
                aria-label="Station Detail"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="10" cy="10" r="7" />
                    <path d="M10 7v3l2 2" />
                </svg>
                Station
            </button>

            <button
                type="button"
                onClick={onOpenReport}
                style={{ color: 'var(--muted)' }}
                className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors group focus:outline-none"
                aria-label="Report Station Rush"
            >
                <div
                    style={{
                        background: 'var(--blue)',
                        boxShadow: '0 2px 10px rgba(29,111,242,0.35)',
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center group-active:scale-95 transition-transform"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    >
                        <path d="M8 2v12M2 8h12" />
                    </svg>
                </div>
                Report
            </button>
        </nav>
    );
}
