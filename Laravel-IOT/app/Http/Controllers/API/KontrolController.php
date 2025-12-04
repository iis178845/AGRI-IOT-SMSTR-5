<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\KontrolManual;
use Illuminate\Http\Request;

class KontrolController extends Controller
{
       public function getStatus()
    {
        $data = KontrolManual::first();
        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }


    public function update(Request $request)
    {
        $request->validate([
            'suhu_udara'       => 'required',
            'kipas_ventilasi'  => 'required',
            'lampu_growth_light' => 'required',
            'kecepatan_kipas'  => 'required|integer|min:0|max:100',
            'ph_naik'=>'required',
            'ph_turun'=>'required',
            'nutrisi_a'=>'required',
            'nutrisi_b'=>'required'

        ]);

        
        $control = KontrolManual::first();
        if($control==null){
            KontrolManual::create([
            'suhu_udara'       => $request->suhu_udara,
            'kipas_ventilasi'  => $request->kipas_ventilasi,
            'lampu_growth_light' => $request->lampu_growth_light,
            'kecepatan_kipas'  => $request->kecepatan_kipas,
            'ph_naik'=>$request->ph_naik,
            'ph_turun'=>$request->ph_turun,
            'nutrisi_a'=>$request->nutrisi_a,
            'nutrisi_b'=>$request->nutrisi_b,

            ]);
        }else{
        $control->update($request->all());

        }

        return response()->json([
            'success' => true,
            'message' => 'Kontrol berhasil diperbarui',
            'data' => $control
        ], 200);
    }

}
