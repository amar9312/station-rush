import React from 'react';
import type { MetroLine } from '../types';
import StatusPill from './StatusPill';

interface Props {
    line: MetroLine;
    onPress: () => void;
}

export default function LineCard({ line, onPress }: Props) {
    return (
        <button
            type="button"
            onClick={onPress}
            style={{
                background: 'var(--card)',
                border: '1.5px solid var(--border)',
            }}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left active:scale-[0.98] transition-all hover:border-[var(--blue)] cursor-pointer"
        >
            <span
                style={{ background: line.color }}
                className="w-1.5 self-stretch rounded-full shrink-0"
                aria-hidden
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                        className="text-sm font-bold truncate"
                    >
                        {line.name}
                    </span>
                    <StatusPill status={line.status} label={line.statusLabel} />
                </div>
                <p
                    style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}
                    className="text-xs truncate"
                >
                    {line.from} ↔ {line.to}
                </p>
            </div>
            {line.reportCount > 0 && (
                <span
                    style={{
                        background: 'var(--blue-light)',
                        color: 'var(--blue)',
                        fontFamily: 'var(--font-mono)',
                    }}
                    className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
                    title={`${line.reportCount} recent reports`}
                >
                    {line.reportCount}
                </span>
            )}
        </button>
    );
}
