<?php

namespace App\Support;

use App\Models\Line;
use App\Models\Report;
use App\Models\Station;
use App\Services\RushScore;
use Illuminate\Support\Carbon;

class CataloguePresenter
{
    public function __construct(private RushScore $rushScore) {}

    public function metroLine(Line $line, array $status): array
    {
        $stations = $line->stations->sortBy(fn ($station) => $station->pivot->sequence_order)->values();
        $from = $stations->first()?->name ?? '';
        $to = $stations->last()?->name ?? '';

        return [
            'id' => $line->id,
            'name' => $line->name,
            'slug' => $line->slug,
            'color' => $line->color_code,
            'textColor' => $line->text_color,
            'from' => $from,
            'to' => $to,
            'status' => $status['status'],
            'statusLabel' => $status['statusLabel'],
            'reportCount' => $status['reportCount'],
        ];
    }

    public function station(Station $station, array $linePayloads): array
    {
        $reports = $station->relationLoaded('reports')
            ? $station->reports
            : $station->reports()->get();

        $latest = $reports->sortByDesc('created_at')->first();
        $pivot = $station->lines->first()?->pivot;

        return [
            'id' => $station->id,
            'name' => $station->name,
            'slug' => $station->slug,
            'code' => $station->code,
            'latitude' => $station->latitude !== null ? (float) $station->latitude : null,
            'longitude' => $station->longitude !== null ? (float) $station->longitude : null,
            'platform_1_direction' => $this->platformLabel($pivot?->platform_a_number, $pivot?->platform_a_towards),
            'platform_2_direction' => $this->platformLabel($pivot?->platform_b_number, $pivot?->platform_b_towards),
            'current_rush' => $this->rushScore->bandForStation($station),
            'recent_reports_count' => $reports->count(),
            'updated_at_human' => $latest
                ? $latest->created_at->diffForHumans()
                : 'No reports yet',
            'lines' => $linePayloads,
        ];
    }

    public function communityReport(Report $report): array
    {
        $direction = $report->platform_direction;
        $uiDirection = match ($direction) {
            'platform_a' => 'platform_1',
            'platform_b' => 'platform_2',
            default => 'both',
        };

        return [
            'id' => $report->id,
            'category' => $report->category,
            'severity' => $report->severity,
            'rush_level' => $report->rush_level,
            'comment' => $report->comment ?? '',
            'minutesAgo' => (int) max(0, $report->created_at->diffInMinutes(now())),
            'agrees' => $report->upvotes_count,
            'station' => $report->station?->name ?? '',
            'platform_direction' => $uiDirection,
            'platform_label' => $this->reportPlatformLabel($report),
            'created_at' => $report->created_at?->toIso8601String(),
        ];
    }

    public function activity(Report $report): array
    {
        $line = $report->line;

        return [
            'id' => $report->id,
            'station' => $report->station?->name ?? '',
            'line' => $line?->name ?? 'Network',
            'lineColor' => $line?->color_code ?? '#1D6FF2',
            'category' => $report->category,
            'minutesAgo' => (int) max(0, $report->created_at->diffInMinutes(now())),
        ];
    }

    public function timetableRow($row): array
    {
        $line = $row->line;
        $time = $row->scheduled_time;

        if ($time instanceof Carbon) {
            $formatted = $time->format('H:i');
        } else {
            $formatted = substr((string) $time, 0, 5);
        }

        return [
            'destination' => $row->destination,
            'lineName' => $line?->name ?? '',
            'lineColor' => $line?->color_code ?? '#1D6FF2',
            'scheduledTime' => $formatted,
            'platform' => $row->platform,
            'status' => $row->status === 'Delayed' ? 'Delayed' : 'On Time',
        ];
    }

    public static function toStoredPlatform(string $direction): string
    {
        return match ($direction) {
            'platform_1', 'platform_a' => 'platform_a',
            'platform_2', 'platform_b' => 'platform_b',
            default => 'both',
        };
    }

    private function platformLabel(mixed $number, mixed $towards): ?string
    {
        if ($towards === null || $towards === '') {
            return null;
        }

        if ($number !== null) {
            return 'Platform '.$number.' · Towards '.$towards;
        }

        return 'Towards '.$towards;
    }

    private function reportPlatformLabel(Report $report): string
    {
        if ($report->platform_direction === 'both') {
            return 'Both';
        }

        $line = $report->line;
        $station = $report->station;

        if ($line && $station) {
            $pivot = $station->lines->firstWhere('id', $line->id)?->pivot;
            if ($pivot) {
                $number = $report->platform_direction === 'platform_a'
                    ? $pivot->platform_a_number
                    : $pivot->platform_b_number;
                if ($number !== null) {
                    return 'P'.$number;
                }
            }
        }

        return $report->platform_direction === 'platform_a' ? 'P1' : 'P2';
    }
}
