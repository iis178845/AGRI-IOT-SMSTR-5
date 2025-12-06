<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kontrol_manual', function (Blueprint $table) {
            $table->id();
            $table->enum('suhu_udara', ['manual','otomatis']);
            $table->enum('kipas_ventilasi', ['manual','otomatis']);
            $table->enum('lampu_growth_light', ['manual','otomatis']);
            $table->integer('kecepatan_kipas');
            $table->enum('ph_naik', ['manual','otomatis']);
            $table->enum('ph_turun', ['manual','otomatis']);
            $table->enum('nutrisi_a', ['manual','otomatis']);
            $table->enum('nutrisi_b', ['manual','otomatis']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontrol_manual');
    }
};
