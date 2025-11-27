<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Sensor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SensorController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ph' => 'required',
            'tds' => 'required',
            'suhu_air' => 'required',
            'kelembapan' => 'required',
            'suhu_udara' => 'required',
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
            $sensor = Sensor::create([
                'ph' => $request->ph,
                'tds' => $request->tds,
                'suhu_air' => $request->suhu_air,
                'kelembapan' => $request->kelembapan,
                'suhu_udara' => $request->suhu_udara,

                // 'price'         => $request->price,
                // 'stock'         => $request->stock,
            ]);
            $response = [
                'success' => true,
                'massage' => 'Data Sensor Berhasil disimpan',
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
        $sensor = Sensor::orderBy('created_at','desc')->limit(1)->first();
        $response = [
            'success' => true,
            'massage' => 'Daftar Sensor',
            'data' => $sensor,
        ];

        //return response
        return response()->json($response, 200);
    }

}
