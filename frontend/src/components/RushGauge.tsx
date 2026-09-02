import React from 'react';
import type { RushLevel } from '../types';

interface Props {
    rushLevel?: RushLevel;
    reportCount?: number;
    sublabel?: string;
}

const levelConfig: Record<
    RushLevel,
    {
        label: string;
        defaultSublabel: string;
        bg: string;
        border: string;
        color: string;
        arcColor: string;
        fillDeg: number;
    }
> = {
    low: {
        label: 'Low / No Rush',
        defaultSublabel: 'Normal foot traffic; trains accessible immediately',
        bg: 'var(--status-green-bg)',
        border: '#86efac',
        color: 'var(--status-green)',
        arcColor: '#16A34A',
        fillDeg: 45,
    },
    normal: {
        label: 'Normal Rush',
        defaultSublabel: 'Typical movement; minor platform queues',
        bg: 'var(--status-amber-bg)',
        border: '#fcd34d',
        color: 'var(--status-amber)',
        arcColor: '#D97706',
        fillDeg: 110,
    },
    heavy: {
        label: 'Heavy Rush',
        defaultSublabel: 'Extreme crowding; platform capacity limits',
        bg: 'var(--status-red-bg)',
        border: '#fca5a5',
        color: 'var(--status-red)',
        arcColor: '#DC2626',
        fillDeg: 165,
    },
};

export default function RushGauge({
    rushLevel = 'heavy',
    reportCount = 9,
    sublabel,
}: Props) {
    const cfg = levelConfig[rushLevel] ?? levelConfig.normal;

    const r = 54;
    const cx = 80;
    const cy = 80;
    const startAngle = -180;
    const totalDeg = 180;

    function polarToXY(deg: number) {
        const rad = (deg * Math.PI) / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
        };
    }

    function arcPath(fromDeg: number, toDeg: number) {
        const s = polarToXY(fromDeg);
        const e = polarToXY(toDeg);
        const large = toDeg - fromDeg > 180 ? 1 : 0;
        return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
    }

    const endAngle = startAngle + (cfg.fillDeg / totalDeg) * totalDeg;
    const needleAngle = startAngle + (cfg.fillDeg / totalDeg) * totalDeg;
    const needleRad = (needleAngle * Math.PI) / 180;
    const needleTipX = cx + (r - 10) * Math.cos(needleRad);
    const needleTipY = cy + (r - 10) * Math.sin(needleRad);

    return (
        <section
            style={{
                background: cfg.bg,
                border: `1.5px solid ${cfg.border}`,
            }}
            className="mx-4 mt-4 rounded-2xl p-4 shadow-xs transition-colors duration-300"
        >
            <div className="flex items-center justify-between mb-1">
                <span
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
                    className="text-xs font-bold uppercase tracking-wider"
                >
                    Station Rush Index
                </span>
                <span
                    style={{
                        background: cfg.color,
                        color: '#fff',
                        fontFamily: 'var(--font-mono)',
                    }}
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    LIVE
                </span>
            </div>

            <div className="flex items-center gap-4 mt-2">
                <svg
                    width="150"
                    height="85"
                    viewBox="0 0 160 90"
                    aria-hidden
                    className="shrink-0"
                >
                    {/* Background gauge arc */}
                    <path
                        d={arcPath(startAngle, startAngle + totalDeg)}
                        fill="none"
                        stroke="rgba(0,0,0,0.08)"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                    {/* Active value arc */}
                    <path
                        d={arcPath(startAngle, endAngle)}
                        fill="none"
                        stroke={cfg.arcColor}
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                    {/* Needle */}
                    <line
                        x1={cx}
                        y1={cy}
                        x2={needleTipX}
                        y2={needleTipY}
                        stroke={cfg.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <circle cx={cx} cy={cy} r="4" fill={cfg.color} />
                    <text
                        x="18"
                        y="88"
                        fontSize="9"
                        fill="var(--status-green)"
                        fontFamily="var(--font-mono)"
                        fontWeight="600"
                    >
                        Low
                    </text>
                    <text
                        x="67"
                        y="26"
                        fontSize="9"
                        fill="var(--status-amber)"
                        fontFamily="var(--font-mono)"
                        fontWeight="600"
                        textAnchor="middle"
                    >
                        Med
                    </text>
                    <text
                        x="135"
                        y="88"
                        fontSize="9"
                        fill="var(--status-red)"
                        fontFamily="var(--font-mono)"
                        fontWeight="600"
                        textAnchor="end"
                    >
                        High
                    </text>
                </svg>

                <div className="flex-1 min-w-0">
                    <p
                        style={{ fontFamily: 'var(--font-display)', color: cfg.color }}
                        className="text-lg font-extrabold leading-tight tracking-tight"
                    >
                        {cfg.label}
                    </p>
                    <p
                        style={{ color: 'var(--fg)', fontFamily: 'var(--font-body)' }}
                        className="text-xs mt-1 leading-snug font-medium"
                    >
                        {sublabel ?? cfg.defaultSublabel}
                    </p>
                    <p
                        style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}
                        className="text-[11px] mt-2 font-medium"
                    >
                        Based on {reportCount} recent reports
                    </p>
                </div>
            </div>
        </section>
    );
}
