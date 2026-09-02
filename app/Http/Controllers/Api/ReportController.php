<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Models\Report;
use App\Models\Station;
use App\Services\RushScore;
use App\Support\CataloguePresenter;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ReportController extends Controller
{
    public function store(StoreReportRequest $request, RushScore $rushScore, CataloguePresenter $presenter): JsonResponse
    {
        $station = Station::query()
            ->with('lines')
            ->where('slug', $request->validated('station_slug'))
            ->firstOrFail();

        $ipHash = hash('sha256', $request->ip().'|'.(string) $request->userAgent());

        $recent = Report::query()
            ->where('ip_hash', $ipHash)
            ->where('station_id', $station->id)
            ->where('created_at', '>=', now()->subMinutes(3))
            ->exists();

        if ($recent) {
            return response()->json([
                'message' => 'Please wait 3 minutes before reporting this station again.',
            ], Response::HTTP_TOO_MANY_REQUESTS);
        }

        $lat = $request->validated('latitude');
        $lng = $request->validated('longitude');
        $verified = false;

        if ($lat !== null && $lng !== null && $station->latitude !== null && $station->longitude !== null) {
            $verified = RushScore::distanceMeters(
                (float) $lat,
                (float) $lng,
                (float) $station->latitude,
                (float) $station->longitude,
            ) <= 500;
        }

        $lineId = $request->validated('line_id');
        if (! $lineId) {
            $lineId = $station->lines->first()?->id;
        }

        $severity = $request->validated('severity');
        $rush = $request->validated('rush_level') ?? match ($severity) {
            'Minor' => 'low',
            'Severe' => 'heavy',
            default => 'normal',
        };

        $report = Report::query()->create([
            'station_id' => $station->id,
            'line_id' => $lineId,
            'category' => $request->validated('category'),
            'severity' => $severity,
            'rush_level' => $rush,
            'platform_direction' => CataloguePresenter::toStoredPlatform($request->validated('platform_direction')),
            'comment' => $request->validated('comment'),
            'upvotes_count' => 1,
            'downvotes_count' => 0,
            'ip_hash' => $ipHash,
            'latitude' => $lat,
            'longitude' => $lng,
            'is_verified' => $verified,
        ]);

        $report->load(['station', 'line']);

        return response()->json([
            'report' => $presenter->communityReport($report),
            'current_rush' => $rushScore->bandForStation($station->fresh(['reports'])),
        ], Response::HTTP_CREATED);
    }
}
