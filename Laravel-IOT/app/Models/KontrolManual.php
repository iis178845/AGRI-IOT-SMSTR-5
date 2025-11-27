<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KontrolManual extends Model
{
    protected $fillable = [
        'suhu_udara',
        'kipas_ventilasi',
        'lampu_grow_light',
        'kecepatan_kipas',
    ];
}

