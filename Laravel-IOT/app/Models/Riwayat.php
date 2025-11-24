<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Riwayat extends Model
{
        protected $fillable = [
        'ph',
        'ppm',
        'suhu_air',
        'kelembapan',
        'suhu_udara',
        'mode_ph',
        'mode_nutrisi',

    ];

    protected $table='riwayat';
}
