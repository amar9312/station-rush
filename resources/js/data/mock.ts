import type {
    MetroLine,
    Station,
    CommunityReport,
    ActivityItem,
    TimetableEntry,
} from '../types';

export const METRO_LINES: MetroLine[] = [
    {
        id: 'yellow',
        name: 'Yellow Line',
        slug: 'yellow-line',
        color: '#F5C518',
        textColor: '#1a1000',
        from: 'Samaypur Badli',
        to: 'Millennium City Centre',
        status: 'severe',
        statusLabel: 'Signal Delays',
        reportCount: 14,
    },
    {
        id: 'blue',
        name: 'Blue Line',
        slug: 'blue-line',
        color: '#2979FF',
        textColor: '#ffffff',
        from: 'Dwarka Sector 21',
        to: 'Noida Electronic City',
        status: 'moderate',
        statusLabel: 'Moderate Surge',
        reportCount: 7,
    },
    {
        id: 'red',
        name: 'Red Line',
        slug: 'red-line',
        color: '#E53935',
        textColor: '#ffffff',
        from: 'Rithala',
        to: 'Shaheed Sthal',
        status: 'normal',
        statusLabel: 'Normal',
        reportCount: 1,
    },
    {
        id: 'pink',
        name: 'Pink Line',
        slug: 'pink-line',
        color: '#EC407A',
        textColor: '#ffffff',
        from: 'Majlis Park',
        to: 'Shiv Vihar',
        status: 'normal',
        statusLabel: 'Normal',
        reportCount: 0,
    },
    {
        id: 'green',
        name: 'Green Line',
        slug: 'green-line',
        color: '#43A047',
        textColor: '#ffffff',
        from: 'Inderlok',
        to: 'Brigadier Hoshiyar Singh',
        status: 'moderate',
        statusLabel: 'Crowding',
        reportCount: 4,
    },
    {
        id: 'violet',
        name: 'Violet Line',
        slug: 'violet-line',
        color: '#7E57C2',
        textColor: '#ffffff',
        from: 'Kashmere Gate',
        to: 'Raja Nahar Singh',
        status: 'normal',
        statusLabel: 'Normal',
        reportCount: 2,
    },
    {
        id: 'orange',
        name: 'Airport Express',
        slug: 'airport-express',
        color: '#FB8C00',
        textColor: '#ffffff',
        from: 'New Delhi',
        to: 'IGI Airport T3',
        status: 'normal',
        statusLabel: 'Normal',
        reportCount: 0,
    },
    {
        id: 'aqua',
        name: 'Aqua Line',
        slug: 'aqua-line',
        color: '#00ACC1',
        textColor: '#ffffff',
        from: 'Noida Sector 51',
        to: 'Depot',
        status: 'normal',
        statusLabel: 'Normal',
        reportCount: 0,
    },
    {
        id: 'magenta',
        name: 'Magenta Line',
        slug: 'magenta-line',
        color: '#D81B60',
        textColor: '#ffffff',
        from: 'Janakpuri West',
        to: 'Botanical Garden',
        status: 'normal',
        statusLabel: 'Normal',
        reportCount: 1,
    },
];

export const MOCK_STATIONS: Station[] = [
    {
        id: 'rajiv-chowk',
        name: 'Rajiv Chowk',
        slug: 'rajiv-chowk',
        code: 'RKCS',
        platform_1_direction: 'Towards Samaypur Badli / Noida City Centre',
        platform_2_direction: 'Towards Millennium City Centre / Dwarka Sec 21',
        current_rush: 'heavy',
        recent_reports_count: 14,
        updated_at_human: '2 mins ago',
        lines: [
            METRO_LINES[0], // Yellow
            METRO_LINES[1], // Blue
        ],
    },
    {
        id: 'kashmere-gate',
        name: 'Kashmere Gate',
        slug: 'kashmere-gate',
        code: 'KG',
        platform_1_direction: 'Towards Shaheed Sthal / Samaypur Badli',
        platform_2_direction: 'Towards Rithala / Raja Nahar Singh',
        current_rush: 'heavy',
        recent_reports_count: 9,
        updated_at_human: '4 mins ago',
        lines: [
            METRO_LINES[2], // Red
            METRO_LINES[0], // Yellow
            METRO_LINES[5], // Violet
        ],
    },
    {
        id: 'hauz-khas',
        name: 'Hauz Khas',
        slug: 'hauz-khas',
        code: 'HK',
        platform_1_direction: 'Towards Samaypur Badli / Botanical Garden',
        platform_2_direction: 'Towards Millennium City Centre / Janakpuri West',
        current_rush: 'normal',
        recent_reports_count: 6,
        updated_at_human: '7 mins ago',
        lines: [
            METRO_LINES[0], // Yellow
            METRO_LINES[8], // Magenta
        ],
    },
    {
        id: 'mandi-house',
        name: 'Mandi House',
        slug: 'mandi-house',
        code: 'MDHS',
        platform_1_direction: 'Towards Noida / Kashmere Gate',
        platform_2_direction: 'Towards Dwarka / Raja Nahar Singh',
        current_rush: 'low',
        recent_reports_count: 2,
        updated_at_human: '15 mins ago',
        lines: [
            METRO_LINES[1], // Blue
            METRO_LINES[5], // Violet
        ],
    },
    {
        id: 'central-secretariat',
        name: 'Central Secretariat',
        slug: 'central-secretariat',
        code: 'CS',
        platform_1_direction: 'Towards Samaypur Badli / Kashmere Gate',
        platform_2_direction: 'Towards Millennium City Centre / Badarpur',
        current_rush: 'normal',
        recent_reports_count: 5,
        updated_at_human: '10 mins ago',
        lines: [
            METRO_LINES[0], // Yellow
            METRO_LINES[5], // Violet
        ],
    },
    {
        id: 'new-delhi',
        name: 'New Delhi',
        slug: 'new-delhi',
        code: 'NDLS',
        platform_1_direction: 'Towards Samaypur Badli / IGI Airport',
        platform_2_direction: 'Towards Millennium City Centre',
        current_rush: 'heavy',
        recent_reports_count: 11,
        updated_at_human: '3 mins ago',
        lines: [
            METRO_LINES[0], // Yellow
            METRO_LINES[6], // Airport Express
        ],
    },
    {
        id: 'botanical-garden',
        name: 'Botanical Garden',
        slug: 'botanical-garden',
        code: 'BG',
        platform_1_direction: 'Towards Noida Electronic City / Janakpuri West',
        platform_2_direction: 'Towards Dwarka Sector 21',
        current_rush: 'normal',
        recent_reports_count: 4,
        updated_at_human: '12 mins ago',
        lines: [
            METRO_LINES[1], // Blue
            METRO_LINES[8], // Magenta
        ],
    },
    {
        id: 'chandni-chowk',
        name: 'Chandni Chowk',
        slug: 'chandni-chowk',
        code: 'CC',
        platform_1_direction: 'Towards Samaypur Badli',
        platform_2_direction: 'Towards Millennium City Centre',
        current_rush: 'heavy',
        recent_reports_count: 8,
        updated_at_human: '5 mins ago',
        lines: [
            METRO_LINES[0], // Yellow
        ],
    },
];

export const NETWORK_ALERT = {
    active: true,
    message: 'Yellow Line experiencing signal-related delays between Vishwavidyalaya and Kashmere Gate.',
};

export const COMMUNITY_REPORTS: Record<string, CommunityReport[]> = {
    'rajiv-chowk': [
        {
            id: 'r1',
            category: 'Crowd Surge',
            severity: 'Severe',
            rush_level: 'heavy',
            comment: "Platform 2 absolutely packed. Can't board the train. 3rd one passing without space.",
            minutesAgo: 4,
            agrees: 9,
            station: 'Rajiv Chowk',
            platform_direction: 'platform_2',
        },
        {
            id: 'r2',
            category: 'Train Delay',
            severity: 'Moderate',
            rush_level: 'normal',
            comment: 'No Yellow Line train for 12 minutes now. Announcement says signal fault near Kashmere Gate.',
            minutesAgo: 8,
            agrees: 6,
            station: 'Rajiv Chowk',
            platform_direction: 'platform_1',
        },
        {
            id: 'r3',
            category: 'Gate Closed',
            severity: 'Minor',
            rush_level: 'low',
            comment: 'Gate 7 exit closed. Staff redirecting to Gate 5. Adds 5 min walk.',
            minutesAgo: 15,
            agrees: 4,
            station: 'Rajiv Chowk',
            platform_direction: 'both',
        },
        {
            id: 'r4',
            category: 'Security',
            severity: 'Moderate',
            rush_level: 'normal',
            comment: 'Long queue at security — frisking line backed up to the stairs. Allow extra 10 mins.',
            minutesAgo: 22,
            agrees: 3,
            station: 'Rajiv Chowk',
            platform_direction: 'both',
        },
        {
            id: 'r5',
            category: 'Crowd Surge',
            severity: 'Minor',
            rush_level: 'low',
            comment: 'Blue Line side less crowded right now. Better to use that platform if transferring.',
            minutesAgo: 31,
            agrees: 7,
            station: 'Rajiv Chowk',
            platform_direction: 'platform_1',
        },
    ],
};

export const RECENT_ACTIVITY: ActivityItem[] = [
    {
        id: 'a1',
        station: 'Rajiv Chowk',
        line: 'Yellow Line',
        lineColor: '#F5C518',
        category: 'Crowd Surge',
        minutesAgo: 4,
    },
    {
        id: 'a2',
        station: 'Hauz Khas',
        line: 'Yellow Line',
        lineColor: '#F5C518',
        category: 'Train Delay',
        minutesAgo: 11,
    },
    {
        id: 'a3',
        station: 'Mandi House',
        line: 'Blue Line',
        lineColor: '#2979FF',
        category: 'Gate Closed',
        minutesAgo: 17,
    },
    {
        id: 'a4',
        station: 'Kashmere Gate',
        line: 'Red Line',
        lineColor: '#E53935',
        category: 'Security',
        minutesAgo: 21,
    },
];

export const TIMETABLE: TimetableEntry[] = [
    {
        destination: 'Millennium City Centre',
        lineName: 'Yellow Line',
        lineColor: '#F5C518',
        scheduledTime: '10:42',
        platform: 'P2',
        status: 'Delayed',
    },
    {
        destination: 'Noida Electronic City',
        lineName: 'Blue Line',
        lineColor: '#2979FF',
        scheduledTime: '10:43',
        platform: 'P1',
        status: 'On Time',
    },
    {
        destination: 'Samaypur Badli',
        lineName: 'Yellow Line',
        lineColor: '#F5C518',
        scheduledTime: '10:47',
        platform: 'P2',
        status: 'Delayed',
    },
    {
        destination: 'Dwarka Sector 21',
        lineName: 'Blue Line',
        lineColor: '#2979FF',
        scheduledTime: '10:48',
        platform: 'P1',
        status: 'On Time',
    },
];
