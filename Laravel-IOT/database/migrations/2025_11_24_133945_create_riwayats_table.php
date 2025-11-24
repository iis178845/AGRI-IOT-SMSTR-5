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
        Schema::create('riwayat', function (Blueprint $table) {
            $table->id();
            $table->string('ph');
            $table->string('ppm');
            $table->string('suhu_air');
            $table->string('kelembapan');
            $table->string('suhu_udara');
            $table->enum('mode_ph',['manual','otomatis']);
            $table->enum('mode_nutrisi',['manual','otomatis']);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat');
    }
};
