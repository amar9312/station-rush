export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: {
        location: string;
        [key: string]: any;
    };
};

export type RushLevel = 'low' | 'normal' | 'heavy';
export type LineStatus = 'normal' | 'moderate' | 'severe';
export type ReportCategory = 'Crowd Surge' | 'Train Delay' | 'Security' | 'Gate Closed';
export type Severity = 'Minor' | 'Moderate' | 'Severe';

export interface MetroLine {
    id: string | number;
    name: string;
    slug: string;
    color: string;
    textColor?: string;
    from: string;
    to: string;
    status: LineStatus;
    statusLabel: string;
    reportCount: number;
}

export interface Line {
    id: number | string;
    name: string;
    slug: string;
    color_code: string;
    text_color?: string;
    sorting_order?: number;
}

export interface Station {
    id: number | string;
    line_id?: number | string;
    name: string;
    slug: string;
    code?: string;
    platform_1_direction?: string;
    platform_2_direction?: string;
    current_rush: RushLevel;
    recent_reports_count: number;
    updated_at_human: string;
    lines?: MetroLine[];
    line?: Line;
    latitude?: number;
    longitude?: number;
}

export interface CommunityReport {
    id: string | number;
    category: ReportCategory;
    severity: Severity;
    rush_level?: RushLevel;
    comment: string;
    minutesAgo: number;
    agrees: number;
    station: string;
    platform_direction?: 'platform_1' | 'platform_2' | 'both';
    created_at?: string;
}

export interface ActivityItem {
    id: string | number;
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
    status: 'On Time' | 'Delayed';
}

export interface CrowdReportPayload {
    station_id?: number | string;
    station_slug?: string;
    category: ReportCategory;
    severity: Severity;
    platform_direction: 'platform_1' | 'platform_2' | 'both';
    rush_level?: RushLevel;
    comment?: string;
}

