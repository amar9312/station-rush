<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Report extends Model
{
    protected $fillable = [
        'station_id',
        'line_id',
        'category',
        'severity',
        'rush_level',
        'platform_direction',
        'comment',
        'upvotes_count',
        'downvotes_count',
        'ip_hash',
        'latitude',
        'longitude',
        'is_verified',
    ];

    protected function casts(): array
    {
        return [
            'upvotes_count' => 'integer',
            'downvotes_count' => 'integer',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'is_verified' => 'boolean',
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

    public function votes(): HasMany
    {
        return $this->hasMany(ReportVote::class);
    }
}
