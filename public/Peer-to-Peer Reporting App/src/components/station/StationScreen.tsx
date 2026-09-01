import StationHeader from "./StationHeader";
import HeatIndexGauge from "./HeatIndexGauge";
import LogUpdateFAB from "./LogUpdateFAB";
import CommunityReportFeed from "./CommunityReportFeed";
import BaselineTimetable from "./BaselineTimetable";

interface Props {
  onBack: () => void;
  onLogUpdate: () => void;
}

export default function StationScreen({ onBack, onLogUpdate }: Props) {
  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "var(--bg)" }}>
      <StationHeader onBack={onBack} />
      <HeatIndexGauge />
      <div className="h-4" />
      <CommunityReportFeed />
      <BaselineTimetable />
      <div className="h-24" />
      <LogUpdateFAB onClick={onLogUpdate} />
    </div>
  );
}
