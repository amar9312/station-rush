import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ActivityItem, CrowdReportPayload, MetroLine, Station } from '../types';
import { getOverview, postReport } from '../api';
import AppHeader from '../components/AppHeader';
import StationSearch from '../components/StationSearch';
import NetworkAlertBanner from '../components/NetworkAlertBanner';
import LineStatusList from '../components/LineStatusList';
import RecentActivityFeed from '../components/RecentActivityFeed';
import BottomNav from '../components/BottomNav';
import ReportModal from '../components/ReportModal';

export default function Overview() {
    const navigate = useNavigate();
    const [lineList, setLineList] = useState<MetroLine[]>([]);
    const [stations, setStations] = useState<Station[]>([]);
    const [activityList, setActivityList] = useState<ActivityItem[]>([]);
    const [networkAlert, setNetworkAlert] = useState({ active: false, message: '' });
    const [weatherText, setWeatherText] = useState<string | undefined>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStationForReport, setSelectedStationForReport] = useState<Station | undefined>();

    async function load() {
        setError(null);
        const data = await getOverview();
        setLineList(data.lines);
        setStations(data.stations);
        setActivityList(data.activities);
        setNetworkAlert(data.networkAlert);
        setWeatherText(data.weatherText);
        setSelectedStationForReport((current) => current ?? data.stations[0]);
    }

    useEffect(() => {
        load()
            .catch((e: Error) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    function handleSelectStation(station: Station) {
        navigate(`/station/${station.slug}`);
    }

    function handleSelectLine(line: MetroLine) {
        const matched =
            stations.find((s) => s.lines?.some((l) => l.id === line.id || l.slug === line.slug)) ??
            stations[0];
        if (matched) {
            handleSelectStation(matched);
        }
    }

    function handleActivityStationClick(stationName: string) {
        const found = stations.find((s) => s.name.toLowerCase() === stationName.toLowerCase());
        if (found) {
            handleSelectStation(found);
        } else if (stations[0]) {
            handleSelectStation(stations[0]);
        }
    }

    async function handleReportSubmit(payload: CrowdReportPayload) {
        await postReport(payload);
        await load();
    }

    return (
        <div
            className="relative flex flex-col min-h-screen w-full max-w-[430px] mx-auto shadow-2xl overflow-x-hidden"
            style={{ background: 'var(--bg)' }}
        >
            <main className="flex-1 flex flex-col overflow-y-auto">
                <AppHeader weatherText={weatherText} />

                {error && (
                    <p className="px-4 text-sm text-[var(--status-red)]">{error}</p>
                )}
                {loading && (
                    <p className="px-4 text-sm text-[var(--muted)]">Loading network…</p>
                )}

                <StationSearch stations={stations} onStationSelect={handleSelectStation} />

                {networkAlert.active && <NetworkAlertBanner message={networkAlert.message} />}

                <LineStatusList lines={lineList} onLinePress={handleSelectLine} />

                <RecentActivityFeed
                    activities={activityList}
                    onSelectStation={handleActivityStationClick}
                />
            </main>

            <BottomNav
                activeScreen="network"
                onSelectScreen={(screen) => {
                    if (screen === 'station' && stations[0]) {
                        navigate(`/station/${stations[0].slug}`);
                    }
                }}
                onOpenReport={() => {
                    setSelectedStationForReport(stations[0]);
                    setModalOpen(true);
                }}
            />

            {modalOpen && (
                <ReportModal
                    station={selectedStationForReport}
                    onClose={() => setModalOpen(false)}
                    onSubmitReport={handleReportSubmit}
                />
            )}
        </div>
    );
}
