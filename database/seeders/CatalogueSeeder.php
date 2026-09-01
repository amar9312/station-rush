<?php

namespace Database\Seeders;

use App\Models\Line;
use App\Models\LineStation;
use App\Models\NetworkAlert;
use App\Models\Report;
use App\Models\Station;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class CatalogueSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/catalogue.json');
        $catalogue = json_decode(File::get($path), true, 512, JSON_THROW_ON_ERROR);

        foreach ($catalogue['lines'] as $row) {
            Line::query()->updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'name' => $row['name'],
                    'color_code' => $row['color_code'],
                    'text_color' => $row['text_color'],
                    'sorting_order' => $row['sorting_order'],
                    'is_active' => true,
                ],
            );
        }

        foreach ($catalogue['stations'] as $row) {
            Station::query()->updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'name' => $row['name'],
                    'code' => $row['code'],
                    'former_name' => $row['former_name'],
                    'latitude' => $row['latitude'],
                    'longitude' => $row['longitude'],
                    'is_interchange' => $row['is_interchange'],
                    'sorting_order' => $row['sorting_order'],
                ],
            );
        }

        $lines = Line::query()->get()->keyBy('slug');
        $stations = Station::query()->get()->keyBy('slug');

        foreach ($catalogue['line_station'] as $row) {
            $line = $lines[$row['line']] ?? null;
            $station = $stations[$row['station']] ?? null;

            if (! $line || ! $station) {
                $this->command?->warn("Skipped pivot {$row['line']} × {$row['station']}");

                continue;
            }

            LineStation::query()->updateOrCreate(
                [
                    'line_id' => $line->id,
                    'station_id' => $station->id,
                ],
                [
                    'sequence_order' => $row['sequence_order'],
                    'platform_a_number' => $row['platform_a_number'],
                    'platform_b_number' => $row['platform_b_number'],
                    'platform_a_towards' => $row['platform_a_towards'],
                    'platform_b_towards' => $row['platform_b_towards'],
                ],
            );
        }

        $this->seedAlert($catalogue['network_alert'] ?? null, $lines);
        $this->seedDemoReports($catalogue['demo_reports'] ?? [], $lines, $stations);
    }

    private function seedAlert(?array $alert, $lines): void
    {
        if (! $alert) {
            return;
        }

        $lineId = isset($alert['line']) ? $lines[$alert['line']]?->id : null;

        NetworkAlert::query()->updateOrCreate(
            [
                'message' => $alert['message'],
            ],
            [
                'line_id' => $lineId,
                'severity' => $alert['severity'] ?? 'warning',
                'is_active' => $alert['is_active'] ?? true,
                'starts_at' => now()->subHour(),
                'expires_at' => now()->addDay(),
            ],
        );
    }

    private function seedDemoReports(array $reports, $lines, $stations): void
    {
        foreach ($reports as $row) {
            $station = $stations[$row['station']] ?? null;

            if (! $station) {
                continue;
            }

            $ipHash = hash('sha256', 'station-rush-demo|'.$row['key']);
            $lineId = $row['line'] ? $lines[$row['line']]?->id : null;

            Report::query()->updateOrCreate(
                ['ip_hash' => $ipHash],
                [
                    'station_id' => $station->id,
                    'line_id' => $lineId,
                    'category' => $row['category'],
                    'severity' => $row['severity'],
                    'rush_level' => $row['rush_level'],
                    'platform_direction' => $row['platform_direction'],
                    'comment' => $row['comment'],
                    'upvotes_count' => $row['upvotes_count'],
                    'downvotes_count' => 0,
                    'latitude' => $station->latitude,
                    'longitude' => $station->longitude,
                    'is_verified' => true,
                    'created_at' => now()->subMinutes($row['minutes_ago']),
                    'updated_at' => now()->subMinutes($row['minutes_ago']),
                ],
            );
        }
    }
}
