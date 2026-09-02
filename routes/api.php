<?php

use App\Http\Controllers\Api\OverviewController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\StationController;
use Illuminate\Support\Facades\Route;

Route::get('/overview', OverviewController::class);
Route::get('/stations/{slug}', [StationController::class, 'show']);
Route::post('/reports', [ReportController::class, 'store']);
