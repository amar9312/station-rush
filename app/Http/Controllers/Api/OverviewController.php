<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Line;
use App\Models\NetworkAlert;
use App\Models\Report;
use App\Models\Station;
use App\Services\RushScore;
use App\Support\CataloguePresenter;
use Illuminate\Http\JsonResponse;

class OverviewController extends Controller
{
    public function __invoke(RushScore $rushScore, CataloguePresenter $presenter): JsonResponse
    {
        $recentReports = Report::query()
            ->with(['station', 'line'])
            ->where('created_at', '>=', now()->subHours(2))
            ->latest()
            ->get();

        $lines = Line::query()
            ->where('is_active', true)
            ->with('stations')
            ->orderBy('sorting_order')
            ->get()
            ->map(function (Line $line) use ($rushScore, $presenter, $recentReports) {
                return $presenter->metroLine($line, $rushScore->lineStatus($line, $recentReports));
            })
            ->values();

        $linePayloadById = $lines->keyBy('id');

        $hubSlugs = [
            'rajiv-chowk',
            'kashmere-gate',
            'hauz-khas',
            'mandi-house',
            'central-secretariat',
            'new-delhi',
            'botanical-garden',
            'chandni-chowk',
        ];

        $stations = Station::query()
            ->with(['lines', 'reports'])
            ->where(function ($query) use ($hubSlugs) {
                $query->where('is_interchange', true)
                    ->orWhereIn('slug', $hubSlugs);
            })
            ->orderBy('sorting_order')
            ->get()
            ->map(function (Station $station) use ($presenter, $linePayloadById) {
                $nested = $station->lines
                    ->map(fn (Line $line) => $linePayloadById->get($line->id))
                    ->filter()
                    ->values()
                    ->all();

                return $presenter->station($station, $nested);
            })
            ->values();

        $alert = NetworkAlert::query()
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('starts_at')->orWhere('starts_at', '<=', now());
            })
            ->where(function ($query) {
                $query->whereNull('expires_at')->orWhere('expires_at', '>=', now());
            })
            ->latest()
            ->first();

        $activities = $recentReports
            ->take(12)
            ->map(fn (Report $report) => $presenter->activity($report))
            ->values();

        return response()->json([
            'lines' => $lines,
            'stations' => $stations,
            'activities' => $activities,
            'networkAlert' => [
                'active' => (bool) $alert,
                'message' => $alert?->message ?? '',
            ],
            'weatherText' => 'Connaught Place · Live network',
        ]);
    }
}
