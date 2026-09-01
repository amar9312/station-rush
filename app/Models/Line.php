<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Line extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'color_code',
        'text_color',
        'sorting_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sorting_order' => 'integer',
        ];
    }

    public function stations(): BelongsToMany
    {
        return $this->belongsToMany(Station::class, 'line_station')
            ->using(LineStation::class)
            ->withPivot([
                'sequence_order',
                'platform_a_number',
                'platform_b_number',
                'platform_a_towards',
                'platform_b_towards',
            ])
            ->orderByPivot('sequence_order');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }

    public function networkAlerts(): HasMany
    {
        return $this->hasMany(NetworkAlert::class);
    }

    public function timetables(): HasMany
    {
        return $this->hasMany(Timetable::class);
    }
}
