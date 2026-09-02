import type { CrowdReportPayload, OverviewResponse, StationResponse } from './types';

const apiBase = import.meta.env.VITE_API_URL ?? '/api';

async function parseJson<T>(response: Response): Promise<T> {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = typeof data.message === 'string' ? data.message : `Request failed (${response.status})`;
        throw new Error(message);
    }
    return data as T;
}

const jsonHeaders = { Accept: 'application/json' };

export function getOverview(): Promise<OverviewResponse> {
    return fetch(`${apiBase}/overview`, { headers: jsonHeaders }).then((r) => parseJson<OverviewResponse>(r));
}

export function getStation(slug: string): Promise<StationResponse> {
    return fetch(`${apiBase}/stations/${encodeURIComponent(slug)}`, { headers: jsonHeaders }).then((r) =>
        parseJson<StationResponse>(r),
    );
}

export async function postReport(payload: CrowdReportPayload): Promise<void> {
    let latitude = payload.latitude;
    let longitude = payload.longitude;

    if (latitude === undefined && navigator.geolocation) {
        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
            });
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;
        } catch {
            // optional GPS
        }
    }

    await fetch(`${apiBase}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            station_slug: payload.station_slug,
            station_id: payload.station_id,
            category: payload.category,
            severity: payload.severity,
            rush_level: payload.rush_level,
            platform_direction: payload.platform_direction,
            comment: payload.comment,
            latitude,
            longitude,
        }),
    }).then((r) => parseJson(r));
}
