<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\KontrolManual;
use Illuminate\Http\Request;

class KontrolManualController extends Controller
{
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KontrolManual;

class KontrolManualController extends Controller
{
    // Ambil status kontrol
    public function getStatus()
    {
        $data = KontrolManual::first();
        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }

    // Update seluruh kontrol
    public function update(Request $request)
    {
        $request->validate([
            'suhu_udara'       => 'boolean',
            'kipas_ventilasi'  => 'boolean',
            'lampu_grow_light' => 'boolean',
            'kecepatan_kipas'  => 'integer|min:0|max:100',
        ]);

        $control = KontrolManual::first();
        $control->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Kontrol berhasil diperbarui',
            'data' => $control
        ], 200);
    }

    // API khusus untuk IoT device (ambil setting)
    public function deviceSync()
    {
        return KontrolManual::first();
    }
}

}
