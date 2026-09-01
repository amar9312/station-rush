import React from 'react';

interface Props {
    name: string;
    color: string;
    textColor?: string;
    small?: boolean;
}

export default function LinePill({
    name,
    color,
    textColor = '#fff',
    small = false,
}: Props) {
    return (
        <span
            style={{ background: color, color: textColor }}
            className={`inline-flex items-center rounded-full font-semibold shrink-0 shadow-xs ${
                small ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
            }`}
        >
            {name}
        </span>
    );
}
