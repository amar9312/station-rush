export type LineStatus = "normal" | "moderate" | "severe";
export type ReportCategory = "Crowd Surge" | "Train Delay" | "Security" | "Gate Closed";
export type Severity = "Minor" | "Moderate" | "Severe";

export interface MetroLine {
  id: string;
  name: string;
  color: string;
  textColor: string;
  from: string;
  to: string;
  status: LineStatus;
  statusLabel: string;
  reportCount: number;
}

export interface CommunityReport {
  id: string;
  category: ReportCategory;
  severity: Severity;
  comment: string;
  minutesAgo: number;
  agrees: number;
  station: string;
}

export interface ActivityItem {
  id: string;
  station: string;
  line: string;
  lineColor: string;
  category: ReportCategory;
  minutesAgo: number;
}

export interface TimetableEntry {
  destination: string;
  lineName: string;
  lineColor: string;
  scheduledTime: string;
  platform: string;
  status: "On Time" | "Delayed";
}

export const METRO_LINES: MetroLine[] = [
  {
    id: "yellow",
    name: "Yellow Line",
    color: "#F5C518",
    textColor: "#1a1000",
    from: "Samaypur Badli",
    to: "Millennium City Centre",
    status: "severe",
    statusLabel: "Signal Delays",
    reportCount: 14,
  },
  {
    id: "blue",
    name: "Blue Line",
    color: "#2979FF",
    textColor: "#ffffff",
    from: "Dwarka Sector 21",
    to: "Noida Electronic City",
    status: "moderate",
    statusLabel: "Moderate Surge",
    reportCount: 7,
  },
  {
    id: "red",
    name: "Red Line",
    color: "#E53935",
    textColor: "#ffffff",
    from: "Rithala",
    to: "Shaheed Sthal",
    status: "normal",
    statusLabel: "Normal",
    reportCount: 1,
  },
  {
    id: "pink",
    name: "Pink Line",
    color: "#EC407A",
    textColor: "#ffffff",
    from: "Majlis Park",
    to: "Shiv Vihar",
    status: "normal",
    statusLabel: "Normal",
    reportCount: 0,
  },
  {
    id: "green",
    name: "Green Line",
    color: "#43A047",
    textColor: "#ffffff",
    from: "Inderlok",
    to: "Brigadier Hoshiyar Singh",
    status: "moderate",
    statusLabel: "Crowding",
    reportCount: 4,
  },
  {
    id: "violet",
    name: "Violet Line",
    color: "#7E57C2",
    textColor: "#ffffff",
    from: "Kashmere Gate",
    to: "Raja Nahar Singh",
    status: "normal",
    statusLabel: "Normal",
    reportCount: 2,
  },
  {
    id: "orange",
    name: "Airport Express",
    color: "#FB8C00",
    textColor: "#ffffff",
    from: "New Delhi",
    to: "IGI Airport T3",
    status: "normal",
    statusLabel: "Normal",
    reportCount: 0,
  },
  {
    id: "aqua",
    name: "Aqua Line",
    color: "#00ACC1",
    textColor: "#ffffff",
    from: "Noida Sector 51",
    to: "Depot",
    status: "normal",
    statusLabel: "Normal",
    reportCount: 0,
  },
  {
    id: "magenta",
    name: "Magenta Line",
    color: "#D81B60",
    textColor: "#ffffff",
    from: "Janakpuri West",
    to: "Botanical Garden",
    status: "normal",
    statusLabel: "Normal",
    reportCount: 1,
  },
];

export const NETWORK_ALERT = {
  active: true,
  message: "Yellow Line experiencing signal-related delays between Vishwavidyalaya and Kashmere Gate.",
};

export const COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: "r1",
    category: "Crowd Surge",
    severity: "Severe",
    comment: "Platform 2 absolutely packed. Can't board the train. 3rd one passing without space.",
    minutesAgo: 4,
    agrees: 9,
    station: "Rajiv Chowk",
  },
  {
    id: "r2",
    category: "Train Delay",
    severity: "Moderate",
    comment: "No Yellow Line train for 12 minutes now. Announcement says signal fault near Kashmere Gate.",
    minutesAgo: 8,
    agrees: 6,
    station: "Rajiv Chowk",
  },
  {
    id: "r3",
    category: "Gate Closed",
    severity: "Minor",
    comment: "Gate 7 exit closed. Staff redirecting to Gate 5. Adds 5 min walk.",
    minutesAgo: 15,
    agrees: 4,
    station: "Rajiv Chowk",
  },
  {
    id: "r4",
    category: "Security",
    severity: "Moderate",
    comment: "Long queue at security — frisking line backed up to the stairs. Allow extra 10 mins.",
    minutesAgo: 22,
    agrees: 3,
    station: "Rajiv Chowk",
  },
  {
    id: "r5",
    category: "Crowd Surge",
    severity: "Minor",
    comment: "Blue Line side less crowded right now. Better to use that platform if transferring.",
    minutesAgo: 31,
    agrees: 7,
    station: "Rajiv Chowk",
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    station: "Rajiv Chowk",
    line: "Yellow Line",
    lineColor: "#F5C518",
    category: "Crowd Surge",
    minutesAgo: 4,
  },
  {
    id: "a2",
    station: "Hauz Khas",
    line: "Yellow Line",
    lineColor: "#F5C518",
    category: "Train Delay",
    minutesAgo: 11,
  },
  {
    id: "a3",
    station: "Mandi House",
    line: "Blue Line",
    lineColor: "#2979FF",
    category: "Gate Closed",
    minutesAgo: 17,
  },
];

export const TIMETABLE: TimetableEntry[] = [
  {
    destination: "Millennium City Centre",
    lineName: "Yellow Line",
    lineColor: "#F5C518",
    scheduledTime: "10:42",
    platform: "P2",
    status: "Delayed",
  },
  {
    destination: "Noida Electronic City",
    lineName: "Blue Line",
    lineColor: "#2979FF",
    scheduledTime: "10:43",
    platform: "P1",
    status: "On Time",
  },
  {
    destination: "Samaypur Badli",
    lineName: "Yellow Line",
    lineColor: "#F5C518",
    scheduledTime: "10:47",
    platform: "P2",
    status: "Delayed",
  },
  {
    destination: "Dwarka Sector 21",
    lineName: "Blue Line",
    lineColor: "#2979FF",
    scheduledTime: "10:48",
    platform: "P1",
    status: "On Time",
  },
];
