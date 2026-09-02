import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CommunityReport, CrowdReportPayload, RushLevel, Station, TimetableEntry } from '../types';
import { getStation, postReport } from '../api';
import LinePill from '../components/LinePill';
import RushGauge from '../components/RushGauge';
import CommunityReportFeed from '../components/CommunityReportFeed';
import BaselineTimetable from '../components/BaselineTimetable';
import LogUpdateFAB from '../components/LogUpdateFAB';
import BottomNav from '../components/BottomNav';
import ReportModal from '../components/ReportModal';

export default function StationDetail() {
    const { slug = 'rajiv-chowk' } = useParams();
    const navigate = useNavigate();
    const [currentStation, setCurrentStation] = useState<Station | null>(null);
    const [allStations, setAllStations] = useState<Station[]>([]);
    const [reportList, setReportList] = useState<CommunityReport[]>([]);
    const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [stationRush, setStationRush] = useState<RushLevel>('normal');
    const [reportCount, setReportCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    async function load(nextSlug: string) {
        setError(null);
        const data = await getStation(nextSlug);
        setCurrentStation(data.station);
        setAllStations(data.allStations);
        setReportList(data.reports);
        setTimetable(data.timetable);
        setStationRush(data.station.current_rush);
        setReportCount(data.station.recent_reports_count);
        document.title = `${data.station.name} - Live Rush - Station Rush`;
    }

    useEffect(() => {
        load(slug).catch((e: Error) => setError(e.message));
    }, [slug]);

    function handleStationChange(newSlug: string) {
        navigate(`/station/${newSlug}`);
    }

    async function handleReportSubmit(payload: CrowdReportPayload) {
        await postReport(payload);
        await load(slug);
    }

    if (!currentStation && !error) {
        return (
            <p className="p-4 text-sm text-[var(--muted)] max-w-[430px] mx-auto">Loading station…</p>
        );
    }

    if (error && !currentStation) {
        return <p className="p-4 text-sm text-[var(--status-red)]">{error}</p>;
    }

    if (!currentStation) {
        return null;
    }

    return (
        <div
            className="relative flex flex-col min-h-screen w-full max-w-[430px] mx-auto shadow-2xl overflow-x-hidden"
            style={{ background: 'var(--bg)' }}
        >
            <main className="flex-1 flex flex-col overflow-y-auto pb-24">
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
                            onClick={() => navigate('/')}
                            style={{ color: 'var(--blue)', fontFamily: 'var(--font-body)' }}
                            className="flex items-center gap-1 text-sm font-semibold hover:underline cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 12L6 8l4-4" />
                            </svg>
                            Network
                        </button>

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
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--fg)' }}
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
                            <LinePill name="Metro" color="#1D6FF2" textColor="#ffffff" />
                        )}
                    </div>
                </header>

                <RushGauge
                    rushLevel={stationRush}
                    reportCount={reportCount}
                    sublabel={
                        stationRush === 'heavy'
                            ? 'Crowding reported recently'
                            : stationRush === 'normal'
                              ? 'Platform queue moving steadily'
                              : 'Clear boarding · all gates open'
                    }
                />

                <div className="h-4" />

                <CommunityReportFeed reports={reportList} />

                <BaselineTimetable timetable={timetable} />
            </main>

            <LogUpdateFAB onClick={() => setModalOpen(true)} label="Log Station Update" />

            <BottomNav
                activeScreen="station"
                onSelectScreen={(screen) => {
                    if (screen === 'network') {
                        navigate('/');
                    }
                }}
                onOpenReport={() => setModalOpen(true)}
            />

            {modalOpen && (
                <ReportModal
                    station={currentStation}
                    onClose={() => setModalOpen(false)}
                    onSubmitReport={handleReportSubmit}
                />
            )}
        </div>
    );
}
