import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import type {
	MetroLine,
	Station,
	ActivityItem,
	CrowdReportPayload,
} from '../types';
import {
	METRO_LINES as DEFAULT_LINES,
	MOCK_STATIONS,
	RECENT_ACTIVITY as DEFAULT_ACTIVITIES,
	NETWORK_ALERT,
} from '../data/mock';
import AppHeader from '../Components/AppHeader';
import StationSearch from '../Components/StationSearch';
import NetworkAlertBanner from '../Components/NetworkAlertBanner';
import LineStatusList from '../Components/LineStatusList';
import RecentActivityFeed from '../Components/RecentActivityFeed';
import BottomNav from '../Components/BottomNav';
import ReportModal from '../Components/ReportModal';

interface Props {
	lines?: MetroLine[];
	stations?: Station[];
	activities?: ActivityItem[];
	networkAlert?: {
		active: boolean;
		message: string;
	};
	weatherText?: string;
}

export default function Overview({
	lines = DEFAULT_LINES,
	stations = MOCK_STATIONS,
	activities = DEFAULT_ACTIVITIES,
	networkAlert = NETWORK_ALERT,
	weatherText,
}: Props) {
	const [lineList, setLineList] = useState<MetroLine[]>(lines);
	const [activityList, setActivityList] = useState<ActivityItem[]>(activities);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedStationForReport, setSelectedStationForReport] = useState<Station | undefined>(
		stations[0],
	);

	function handleSelectStation(station: Station) {
		// Navigate to station view
		router.visit(`/station/${station.slug}`, {
			preserveState: false,
		});
	}

	function handleSelectLine(line: MetroLine) {
		// Find first station belonging to this line
		const matched = stations.find((s) =>
			s.lines?.some((l) => l.id === line.id || l.slug === line.slug),
		) ?? stations[0];
		handleSelectStation(matched);
	}

	function handleActivityStationClick(stationName: string) {
		const found = stations.find(
			(s) => s.name.toLowerCase() === stationName.toLowerCase(),
		);
		if (found) {
			handleSelectStation(found);
		} else {
			handleSelectStation(stations[0]);
		}
	}

	function handleReportSubmit(payload: CrowdReportPayload) {
		const targetStation = selectedStationForReport ?? stations[0];

		// Optimistically add to recent activity
		const newActivity: ActivityItem = {
			id: `act_${Date.now()}`,
			station: targetStation.name,
			line: targetStation.lines?.[0]?.name ?? 'Yellow Line',
			lineColor: targetStation.lines?.[0]?.color ?? '#F5C518',
			category: payload.category,
			minutesAgo: 0,
		};

		setActivityList((prev) => [newActivity, ...prev]);

		// Optimistically increment line count
		setLineList((prev) =>
			prev.map((l) => {
				if (targetStation.lines?.some((sl) => sl.id === l.id)) {
					return { ...l, reportCount: l.reportCount + 1 };
				}
				return l;
			}),
		);
	}

	return (
		<>
			<Head title="Network Overview - Station Rush" />

			<div
				className="relative flex flex-col min-h-screen w-full max-w-[430px] mx-auto shadow-2xl overflow-x-hidden"
				style={{
					background: 'var(--bg)',
				}}
			>
				{/* Scrollable Content */}
				<main className="flex-1 flex flex-col overflow-y-auto">
					<AppHeader weatherText={weatherText} />

					<StationSearch
						stations={stations}
						onStationSelect={handleSelectStation}
					/>

					{networkAlert.active && (
						<NetworkAlertBanner message={networkAlert.message} />
					)}

					<LineStatusList
						lines={lineList}
						onLinePress={handleSelectLine}
					/>

					<RecentActivityFeed
						activities={activityList}
						onSelectStation={handleActivityStationClick}
					/>
				</main>

				{/* Bottom Navigation */}
				<BottomNav
					activeScreen="network"
					onSelectScreen={(screen) => {
						if (screen === 'station') {
							router.visit(`/station/${stations[0].slug}`);
						}
					}}
					onOpenReport={() => {
						setSelectedStationForReport(stations[0]);
						setModalOpen(true);
					}}
				/>

				{/* Report Modal */}
				{modalOpen && (
					<ReportModal
						station={selectedStationForReport}
						onClose={() => setModalOpen(false)}
						onSubmitReport={handleReportSubmit}
					/>
				)}
			</div>
		</>
	);
}
