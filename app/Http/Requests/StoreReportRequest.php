<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'station_slug' => ['required', 'string', 'exists:stations,slug'],
            'station_id' => ['nullable', 'integer', 'exists:stations,id'],
            'line_id' => ['nullable', 'integer', 'exists:lines,id'],
            'category' => ['required', Rule::in(['Crowd Surge', 'Train Delay', 'Security', 'Gate Closed'])],
            'severity' => ['required', Rule::in(['Minor', 'Moderate', 'Severe'])],
            'rush_level' => ['nullable', Rule::in(['low', 'normal', 'heavy'])],
            'platform_direction' => ['required', Rule::in([
                'platform_1', 'platform_2', 'both', 'platform_a', 'platform_b',
            ])],
            'comment' => ['nullable', 'string', 'max:140'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
        ];
    }
}
