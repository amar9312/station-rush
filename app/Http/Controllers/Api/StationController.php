<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Line;
use App\Models\Report;
use App\Models\Station;
use App\Services\RushScore;
use App\Support\CataloguePresenter;
use Illuminate\Http\JsonResponse;

class StationController extends Controller
{
    public function show(string $slug, RushScore $rushScore, CataloguePresenter $presenter): JsonResponse
    {
        $station = Station::query()
            ->with(['lines', 'reports.station', 'reports.line', 'timetables.line'])
            ->where('slug', $slug)
            ->firstOrFail();

        $recentReports = Report::query()
            ->where('created_at', '>=', now()->subHours(2))
            ->get();

        $linePayloads = $station->lines
            ->map(fn (Line $line) => $presenter->metroLine($line, $rushScore->lineStatus($line, $recentReports)))
            ->values()
            ->all();

        $reports = $station->reports
            ->sortByDesc('created_at')
            ->values()
            ->map(fn (Report $report) => $presenter->communityReport($report));

        $timetable = $station->timetables
            ->map(fn ($row) => $presenter->timetableRow($row))
            ->values();

        $hubs = Station::query()
            ->where('is_interchange', true)
            ->orWhereIn('slug', [
                'rajiv-chowk',
                'kashmere-gate',
                'hauz-khas',
                'mandi-house',
                'central-secretariat',
                'new-delhi',
                'botanical-garden',
                'chandni-chowk',
            ])
            ->with(['lines', 'reports'])
            ->orderBy('sorting_order')
            ->get();

        $allStations = $hubs->map(function (Station $hub) use ($presenter, $rushScore, $recentReports) {
            $nested = $hub->lines
                ->map(fn (Line $line) => $presenter->metroLine($line, $rushScore->lineStatus($line, $recentReports)))
                ->values()
                ->all();

            return $presenter->station($hub, $nested);
        })->values();

        return response()->json([
            'station' => $presenter->station($station, $linePayloads),
            'reports' => $reports,
            'timetable' => $timetable,
            'allStations' => $allStations,
        ]);
    }
}
