<?php

namespace App\Services;

use App\Models\Line;
use App\Models\Report;
use App\Models\Station;
use Carbon\CarbonInterface;
use Illuminate\Support\Collection;

class RushScore
{
    private const WEIGHTS = [
        'Minor' => 1.0,
        'Moderate' => 2.0,
        'Severe' => 3.5,
    ];

    public function bandForStation(Station $station, ?CarbonInterface $now = null): string
    {
        $score = $this->scoreForStation($station, $now);

        if ($score < 3.0) {
            return 'low';
        }

        if ($score < 8.0) {
            return 'normal';
        }

        return 'heavy';
    }

    public function scoreForStation(Station $station, ?CarbonInterface $now = null): float
    {
        $now ??= now();
        $lambda = log(2) / 15;

        $reports = $station->relationLoaded('reports')
            ? $station->reports
            : $station->reports()->get();

        $score = 0.0;

        foreach ($reports as $report) {
            if ($this->isSuppressed($report)) {
                continue;
            }

            $minutes = max(0.0, abs($now->getTimestamp() - $report->created_at->getTimestamp()) / 60.0);
            $weight = self::WEIGHTS[$report->severity] ?? 1.0;
            $voteTerm = max(0.0, 1 + 0.2 * ($report->upvotes_count - 1) - 0.5 * $report->downvotes_count);
            $score += $weight * $voteTerm * exp(-$lambda * $minutes);
        }

        return $score;
    }

    public function isSuppressed(Report $report): bool
    {
        return $report->downvotes_count > ($report->upvotes_count * 2);
    }

    /**
     * @return array{status: string, statusLabel: string, reportCount: int}
     */
    public function lineStatus(Line $line, Collection $recentReports): array
    {
        $count = $recentReports->where('line_id', $line->id)->count();
        $severities = $recentReports->where('line_id', $line->id)->pluck('severity');

        if ($severities->contains('Severe')) {
            return ['status' => 'severe', 'statusLabel' => 'Severe reports', 'reportCount' => $count];
        }

        if ($severities->contains('Moderate') || $count >= 3) {
            return ['status' => 'moderate', 'statusLabel' => 'Moderate surge', 'reportCount' => $count];
        }

        if ($count > 0) {
            return ['status' => 'normal', 'statusLabel' => 'Normal', 'reportCount' => $count];
        }

        return ['status' => 'normal', 'statusLabel' => 'Normal', 'reportCount' => 0];
    }

    public static function distanceMeters(float $lat1, float $lon1, float $lat2, float $lon2): float
    {
        $earth = 6371000;
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat / 2) ** 2
            + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) ** 2;

        return 2 * $earth * asin(min(1, sqrt($a)));
    }
}
