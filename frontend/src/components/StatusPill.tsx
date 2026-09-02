import React from 'react';
import type { LineStatus, RushLevel } from '../types';

interface Props {
    status: LineStatus | RushLevel;
    label?: string;
}

const config: Record<string, { bg: string; color: string; dot: string; defaultLabel: string }> = {
    normal: {
        bg: 'var(--status-green-bg)',
        color: 'var(--status-green)',
        dot: 'var(--status-green)',
        defaultLabel: 'Normal',
    },
    low: {
        bg: 'var(--status-green-bg)',
        color: 'var(--status-green)',
        dot: 'var(--status-green)',
        defaultLabel: 'Low Rush',
    },
    moderate: {
        bg: 'var(--status-amber-bg)',
        color: 'var(--status-amber)',
        dot: 'var(--status-amber)',
        defaultLabel: 'Moderate',
    },
    severe: {
        bg: 'var(--status-red-bg)',
        color: 'var(--status-red)',
        dot: 'var(--status-red)',
        defaultLabel: 'Severe',
    },
    heavy: {
        bg: 'var(--status-red-bg)',
        color: 'var(--status-red)',
        dot: 'var(--status-red)',
        defaultLabel: 'Heavy Rush',
    },
};

export default function StatusPill({ status, label }: Props) {
    const c = config[status] ?? config.normal;
    const displayLabel = label ?? c.defaultLabel;

    return (
        <span
            style={{ background: c.bg, color: c.color }}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 tracking-tight"
            aria-label={`Status: ${displayLabel}`}
        >
            <span
                style={{ background: c.dot }}
                className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
            />
            {displayLabel}
        </span>
    );
}
