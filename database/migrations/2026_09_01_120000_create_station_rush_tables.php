<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lines', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 100)->unique();
            $table->string('color_code', 7);
            $table->string('text_color', 7)->default('#FFFFFF');
            $table->integer('sorting_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestampsTz();
        });

        Schema::create('stations', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug', 150)->unique();
            $table->string('code', 16)->nullable()->index();
            $table->string('former_name', 150)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('is_interchange')->default(false);
            $table->integer('sorting_order')->default(0);
            $table->timestampsTz();
        });

        Schema::create('line_station', function (Blueprint $table) {
            $table->id();
            $table->foreignId('line_id')->constrained('lines')->cascadeOnDelete();
            $table->foreignId('station_id')->constrained('stations')->cascadeOnDelete();
            $table->integer('sequence_order')->default(0);
            $table->smallInteger('platform_a_number')->nullable();
            $table->smallInteger('platform_b_number')->nullable();
            $table->string('platform_a_towards', 150)->nullable();
            $table->string('platform_b_towards', 150)->nullable();

            $table->unique(['line_id', 'station_id']);
            $table->index(['line_id', 'sequence_order']);
        });

        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->constrained('stations')->cascadeOnDelete();
            $table->foreignId('line_id')->nullable()->constrained('lines')->nullOnDelete();
            $table->string('category', 50);
            $table->string('severity', 20);
            $table->string('rush_level', 20)->index();
            $table->string('platform_direction', 20)->default('both');
            $table->string('comment', 140)->nullable();
            $table->integer('upvotes_count')->default(1);
            $table->integer('downvotes_count')->default(0);
            $table->string('ip_hash', 64)->index();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestampsTz();

            $table->index(['station_id', 'created_at']);
            $table->index(['ip_hash', 'station_id', 'created_at']);
        });

        Schema::create('report_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->cascadeOnDelete();
            $table->string('ip_hash', 64)->index();
            $table->string('vote_type', 20)->default('agree');
            $table->timestampTz('created_at')->nullable();

            $table->unique(['report_id', 'ip_hash']);
        });

        Schema::create('network_alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('line_id')->nullable()->constrained('lines')->cascadeOnDelete();
            $table->string('severity', 20)->default('warning');
            $table->text('message');
            $table->boolean('is_active')->default(true)->index();
            $table->timestampTz('starts_at')->nullable();
            $table->timestampTz('expires_at')->nullable();
            $table->timestampsTz();
        });

        Schema::create('timetables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('station_id')->constrained('stations')->cascadeOnDelete();
            $table->foreignId('line_id')->constrained('lines')->cascadeOnDelete();
            $table->string('destination', 150);
            $table->string('platform', 20);
            $table->time('scheduled_time');
            $table->string('status', 20)->default('On Time');
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('timetables');
        Schema::dropIfExists('network_alerts');
        Schema::dropIfExists('report_votes');
        Schema::dropIfExists('reports');
        Schema::dropIfExists('line_station');
        Schema::dropIfExists('stations');
        Schema::dropIfExists('lines');
    }
};
