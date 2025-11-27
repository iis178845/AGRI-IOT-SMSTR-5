<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
            protected $fillable = [
        'ph',
        'tds',
        'suhu_air',
        'kelembapan',
        'suhu_udara',
        ];

}
