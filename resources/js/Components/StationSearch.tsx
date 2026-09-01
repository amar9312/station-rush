import React, { useState, useRef, useEffect } from 'react';
import type { Station } from '../types';
import StatusPill from './StatusPill';

interface Props {
    stations?: Station[];
    onStationSelect: (station: Station) => void;
}

export default function StationSearch({ stations = [], onStationSelect }: Props) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredStations = query.trim()
        ? stations.filter(
              (s) =>
                  s.name.toLowerCase().includes(query.toLowerCase()) ||
                  s.lines?.some((l) =>
                      l.name.toLowerCase().includes(query.toLowerCase()),
                  ) ||
                  (s.code && s.code.toLowerCase().includes(query.toLowerCase())),
          )
        : [];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="px-4 pb-3 relative z-30">
            <div
                style={{
                    background: 'var(--card)',
                    border: '1.5px solid var(--border)',
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm transition-all focus-within:border-[var(--blue)] focus-within:ring-2 focus-within:ring-blue-100"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="var(--muted)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="shrink-0"
                >
                    <circle cx="8" cy="8" r="6" />
                    <path d="M18 18l-4.5-4.5" />
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search station (e.g., Rajiv Chowk, Hauz Khas)..."
                    style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--fg)',
                    }}
                    className="w-full bg-transparent border-0 p-0 text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-0"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        style={{ color: 'var(--muted)' }}
                        className="text-xs font-bold p-1 rounded-full hover:bg-gray-100"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && query.trim().length > 0 && (
                <div
                    style={{
                        background: 'var(--card)',
                        border: '1.5px solid var(--border)',
                    }}
                    className="absolute left-4 right-4 mt-1.5 max-h-64 overflow-y-auto rounded-xl shadow-xl z-50 divide-y divide-[var(--border)]"
                >
                    {filteredStations.length > 0 ? (
                        filteredStations.map((station) => (
                            <button
                                key={station.id}
                                type="button"
                                onClick={() => {
                                    onStationSelect(station);
                                    setIsOpen(false);
                                    setQuery('');
                                }}
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[var(--blue-light)] transition-colors"
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            style={{
                                                fontFamily: 'var(--font-display)',
                                                color: 'var(--fg)',
                                            }}
                                            className="text-sm font-semibold"
                                        >
                                            {station.name}
                                        </span>
                                        {station.code && (
                                            <span
                                                style={{
                                                    fontFamily: 'var(--font-mono)',
                                                    color: 'var(--muted)',
                                                }}
                                                className="text-[11px] bg-gray-100 px-1.5 py-0.5 rounded"
                                            >
                                                {station.code}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        {station.lines?.map((line) => (
                                            <span
                                                key={line.id}
                                                style={{
                                                    background: line.color,
                                                    color: line.textColor ?? '#fff',
                                                }}
                                                className="text-[10px] font-bold px-1.5 py-0.2 rounded-full"
                                            >
                                                {line.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <StatusPill status={station.current_rush} />
                            </button>
                        ))
                    ) : (
                        <div
                            style={{
                                color: 'var(--muted)',
                                fontFamily: 'var(--font-body)',
                            }}
                            className="px-4 py-3 text-xs text-center"
                        >
                            No metro stations matching "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
