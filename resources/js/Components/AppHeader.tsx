import React from 'react';

interface Props {
    weatherText?: string;
}

export default function AppHeader({ weatherText = 'Connaught Place · Light Rain' }: Props) {
    return (
        <header className="flex items-center justify-between px-4 pt-5 pb-3 bg-[var(--bg)]">
            <div>
                <h1
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                    className="text-2xl font-extrabold tracking-tight leading-none"
                >
                    Station<span style={{ color: 'var(--blue)' }}>Rush</span>
                </h1>
                <p
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}
                    className="text-xs mt-0.5 tracking-tight font-medium"
                >
                    DMRC Live Network
                </p>
            </div>
            <div
                style={{
                    background: 'var(--blue-light)',
                    border: '1px solid var(--border)',
                    color: 'var(--blue)',
                    fontFamily: 'var(--font-mono)',
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0"
            >
                <span className="text-sm">☁</span>
                <span className="truncate max-w-[180px]">{weatherText}</span>
            </div>
        </header>
    );
}
