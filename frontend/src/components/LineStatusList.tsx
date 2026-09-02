import React from 'react';
import type { MetroLine } from '../types';
import LineCard from './LineCard';

interface Props {
    lines: MetroLine[];
    onLinePress: (line: MetroLine) => void;
}

export default function LineStatusList({ lines, onLinePress }: Props) {
    return (
        <section className="px-4 pb-4">
            <div className="flex items-center justify-between mb-3">
                <h2
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                    className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]"
                >
                    Line Status
                </h2>
                <span
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
                    className="text-xs"
                >
                    {lines.length} Lines Live
                </span>
            </div>
            <div className="flex flex-col gap-2.5">
                {lines.map((line) => (
                    <LineCard
                        key={line.id}
                        line={line}
                        onPress={() => onLinePress(line)}
                    />
                ))}
            </div>
        </section>
    );
}
