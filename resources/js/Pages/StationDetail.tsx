import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import type {
    Station,
    CommunityReport,
    TimetableEntry,
    CrowdReportPayload,
    RushLevel,
} from '../types';
import {
    MOCK_STATIONS,
    COMMUNITY_REPORTS,
    TIMETABLE as DEFAULT_TIMETABLE,
} from '../data/mock';
import LinePill from '../Components/LinePill';
import RushGauge from '../Components/RushGauge';
import CommunityReportFeed from '../Components/CommunityReportFeed';
import BaselineTimetable from '../Components/BaselineTimetable';
import LogUpdateFAB from '../Components/LogUpdateFAB';
import BottomNav from '../Components/BottomNav';
import ReportModal from '../Components/ReportModal';

interface Props {
    slug?: string;
    station?: Station;
    allStations?: Station[];
    reports?: CommunityReport[];
    timetable?: TimetableEntry[];
}

export default function StationDetail({
    slug,
    station,
    allStations = MOCK_STATIONS,
    reports,
    timetable = DEFAULT_TIMETABLE,
}: Props) {
    const selectedStation =
        station ??
        (slug ? allStations.find((s) => s.slug === slug) : undefined) ??
        allStations[0];

    const stationSlug = selectedStation.slug || 'rajiv-chowk';
    const initialReports =
        reports ??
        COMMUNITY_REPORTS[stationSlug] ??
        COMMUNITY_REPORTS['rajiv-chowk'] ??
        [];

    const [currentStation, setCurrentStation] = useState<Station>(selectedStation);
    const [reportList, setReportList] = useState<CommunityReport[]>(initialReports);
    const [modalOpen, setModalOpen] = useState(false);
    const [stationRush, setStationRush] = useState<RushLevel>(
        currentStation.current_rush || 'heavy',
    );
    const [reportCount, setReportCount] = useState<number>(
        currentStation.recent_reports_count || initialReports.length,
    );

    function handleStationChange(newSlug: string) {
        const found = allStations.find((s) => s.slug === newSlug);
        if (found) {
            setCurrentStation(found);
            setStationRush(found.current_rush);
            setReportCount(found.recent_reports_count);
            setReportList(COMMUNITY_REPORTS[found.slug] ?? []);
            router.visit(`/station/${found.slug}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }

    function handleReportSubmit(payload: CrowdReportPayload) {
        // Map payload to CommunityReport
        const newReport: CommunityReport = {
            id: `usr_${Date.now()}`,
            category: payload.category,
            severity: payload.severity,
            rush_level: payload.rush_level ?? 'normal',
            comment:
                payload.comment ||
                `${payload.category} reported at ${
                    payload.platform_direction === 'platform_1'
                        ? 'Platform 1'
                        : payload.platform_direction === 'platform_2'
                        ? 'Platform 2'
                        : 'station'
                }`,
            minutesAgo: 0,
            agrees: 1,
            station: currentStation.name,
            platform_direction: payload.platform_direction,
        };

        setReportList((prev) => [newReport, ...prev]);
        setReportCount((c) => c + 1);

        if (payload.rush_level) {
            setStationRush(payload.rush_level);
        }
    }

    return (
        <>
            <Head title={`${currentStation.name} - Live Rush - Station Rush`} />

            <div
                className="relative flex flex-col min-h-screen w-full max-w-[430px] mx-auto shadow-2xl overflow-x-hidden"
                style={{
                    background: 'var(--bg)',
                }}
            >
                {/* Scrollable Main Area */}
                <main className="flex-1 flex flex-col overflow-y-auto pb-24">
                    {/* Station Top Header */}
                    <header
                        style={{
                            background: 'var(--card)',
                            borderBottom: '1px solid var(--border)',
                        }}
                        className="px-4 pt-5 pb-4 shadow-xs"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <button
                                type="button"
                                onClick={() => router.visit('/')}
                                style={{
                                    color: 'var(--blue)',
                                    fontFamily: 'var(--font-body)',
                                }}
                                className="flex items-center gap-1 text-sm font-semibold hover:underline cursor-pointer"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M10 12L6 8l4-4" />
                                </svg>
                                Network
                            </button>

                            {/* Quick station selector */}
                            <select
                                value={currentStation.slug}
                                onChange={(e) => handleStationChange(e.target.value)}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--muted)',
                                    background: 'var(--bg)',
                                    border: '1px solid var(--border)',
                                }}
                                className="text-xs py-1 px-2 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--blue)]"
                                aria-label="Change station"
                            >
                                {allStations.map((s) => (
                                    <option key={s.id} value={s.slug}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <h1
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--fg)',
                            }}
                            className="text-2xl font-extrabold tracking-tight mb-2"
                        >
                            {currentStation.name}
                        </h1>

                        <div className="flex items-center gap-2 flex-wrap">
                            {currentStation.lines && currentStation.lines.length > 0 ? (
                                currentStation.lines.map((line) => (
                                    <LinePill
                                        key={line.id}
                                        name={line.name}
                                        color={line.color}
                                        textColor={line.textColor}
                                    />
                                ))
                            ) : (
                                <LinePill
                                    name="Yellow Line"
                                    color="#F5C518"
                                    textColor="#1a1000"
                                />
                            )}
                        </div>
                    </header>

                    {/* Rush Gauge */}
                    <RushGauge
                        rushLevel={stationRush}
                        reportCount={reportCount}
                        sublabel={
                            stationRush === 'heavy'
                                ? 'Platform 2 Overcrowded · multiple reports in last 10m'
                                : stationRush === 'normal'
                                ? 'Platform queue moving steadily'
                                : 'Clear boarding · all gates open'
                        }
                    />

                    <div className="h-4" />

                    {/* Community Reports Feed */}
                    <CommunityReportFeed reports={reportList} />

                    {/* Scheduled Timetable */}
                    <BaselineTimetable timetable={timetable} />
                </main>

                {/* Floating Action Button */}
                <LogUpdateFAB
                    onClick={() => setModalOpen(true)}
                    label="Log Station Update"
                />

                {/* Bottom Navigation */}
                <BottomNav
                    activeScreen="station"
                    onSelectScreen={(screen) => {
                        if (screen === 'network') {
                            router.visit('/');
                        }
                    }}
                    onOpenReport={() => setModalOpen(true)}
                />

                {/* Report Modal */}
                {modalOpen && (
                    <ReportModal
                        station={currentStation}
                        onClose={() => setModalOpen(false)}
                        onSubmitReport={handleReportSubmit}
                    />
                )}
            </div>
        </>
    );
}
