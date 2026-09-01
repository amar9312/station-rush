import React from 'react';

interface Props {
    onClick: () => void;
    label?: string;
}

export default function LogUpdateFAB({
    onClick,
    label = 'Log Station Update',
}: Props) {
    return (
        <div className="fixed bottom-20 left-0 right-0 max-w-[430px] mx-auto flex justify-center px-4 pointer-events-none z-30">
            <button
                type="button"
                onClick={onClick}
                style={{
                    background: 'var(--blue)',
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 6px 24px rgba(29, 111, 242, 0.45)',
                }}
                className="pointer-events-auto flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm active:scale-95 transition-all hover:bg-[var(--blue-dark)] cursor-pointer"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                >
                    <path d="M8 2v12M2 8h12" />
                </svg>
                <span>{label}</span>
            </button>
        </div>
    );
}
