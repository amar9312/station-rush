import AppHeader from "./AppHeader";
import StationSearch from "./StationSearch";
import NetworkAlertBanner from "./NetworkAlertBanner";
import LineStatusList from "./LineStatusList";
import RecentActivityFeed from "./RecentActivityFeed";
import { NETWORK_ALERT } from "../../data/mock";

interface Props {
  onLinePress: () => void;
}

export default function HomeScreen({ onLinePress }: Props) {
  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "var(--bg)" }}>
      <AppHeader />
      <StationSearch onStationSelect={onLinePress} />
      {NETWORK_ALERT.active && <NetworkAlertBanner message={NETWORK_ALERT.message} />}
      <LineStatusList onLinePress={onLinePress} />
      <RecentActivityFeed />
    </div>
  );
}
