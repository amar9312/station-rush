<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Station extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'code',
        'former_name',
        'latitude',
        'longitude',
        'is_interchange',
        'sorting_order',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'is_interchange' => 'boolean',
            'sorting_order' => 'integer',
        ];
    }

    public function lines(): BelongsToMany
    {
        return $this->belongsToMany(Line::class, 'line_station')
            ->using(LineStation::class)
            ->withPivot([
                'sequence_order',
                'platform_a_number',
                'platform_b_number',
                'platform_a_towards',
                'platform_b_towards',
            ])
            ->orderBy('lines.sorting_order');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function timetables(): HasMany
    {
        return $this->hasMany(Timetable::class);
    }
}
