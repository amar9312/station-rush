import { METRO_LINES } from "../../data/mock";
import LineCard from "./LineCard";

interface Props {
  onLinePress: () => void;
}

export default function LineStatusList({ onLinePress }: Props) {
  return (
    <div className="px-4 pb-3">
      <h2
        style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
        className="text-sm font-700 mb-3 uppercase tracking-wider"
      >
        Line Status
      </h2>
      <div className="flex flex-col gap-2">
        {METRO_LINES.map((line) => (
          <LineCard key={line.id} line={line} onPress={onLinePress} />
        ))}
      </div>
    </div>
  );
}
