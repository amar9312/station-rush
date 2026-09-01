<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class LineStation extends Pivot
{
    protected $table = 'line_station';

    public $incrementing = true;

    protected $fillable = [
        'line_id',
        'station_id',
        'sequence_order',
        'platform_a_number',
        'platform_b_number',
        'platform_a_towards',
        'platform_b_towards',
    ];

    protected function casts(): array
    {
        return [
            'sequence_order' => 'integer',
            'platform_a_number' => 'integer',
            'platform_b_number' => 'integer',
        ];
    }

    public function line(): BelongsTo
    {
        return $this->belongsTo(Line::class);
    }

    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }
}
