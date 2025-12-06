<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KontrolManual extends Model
{
    protected $fillable = [
        'suhu_udara',
        'kipas_ventilasi',
        'lampu_growth_light',
        'kecepatan_kipas',
        'ph_naik',
        'ph_turun',
        'nutrisi_a',
        'nutrisi_b'
    ];
    protected $table='kontrol_manual';
}

