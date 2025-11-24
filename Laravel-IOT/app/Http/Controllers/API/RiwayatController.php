<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Riwayat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RiwayatController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ph' => 'required',
            'ppm' => 'required',
            'suhu_air' => 'required',
            'kelembapan' => 'required',
            'suhu_udara' => 'required',
            'mode_ph' => 'required',
            'mode_nutrisi' => 'required',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'massage' => $validator->errors(),
            ];

            return response()->json($response, 422);
        }

        try {
            //create product
            $riwayat = Riwayat::create([
                'ph' => $request->ph,
                'ppm' => $request->ppm,
                'suhu_air' => $request->suhu_air,
                'kelembapan' => $request->kelembapan,
                'suhu_udara' => $request->suhu_udara,
                'mode_ph' => $request->mode_ph,
                'mode_nutrisi' => $request->mode_nutrisi,

                // 'price'         => $request->price,
                // 'stock'         => $request->stock,
            ]);
            $response = [
                'success' => true,
                'massage' => 'Riwayat Berhasil disimpan',
            ];

            //return response
            return response()->json($response, 200);
        } catch (\Exception $e) {
            $response = [
                'success' => false,
                'massage' => $e->getMessage(),
            ];

            //return response
            return response()->json($response, 200);
        }
        //define validation rules
    }
    public function getData()
    {
        $riwayat = Riwayat::all();
        $response = [
            'success' => true,
            'massage' => 'Daftar Riwayat',
            'data' => $riwayat,
        ];

        //return response
        return response()->json($response, 200);
    }
}
