<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Timetable extends Model
{
    protected $fillable = [
        'station_id',
        'line_id',
        'destination',
        'platform',
        'scheduled_time',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'scheduled_time' => 'datetime:H:i:s',
        ];
    }

    public function station(): BelongsTo
    {
        return $this->belongsTo(Station::class);
    }

    public function line(): BelongsTo
    {
        return $this->belongsTo(Line::class);
    }
}
