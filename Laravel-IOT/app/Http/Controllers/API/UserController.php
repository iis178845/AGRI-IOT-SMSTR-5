<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{
     public function login(Request $request)
{
    try {

        // Validasi request
        $validator = Validator::make($request->all(), [
            'email'     => 'required|email',
            'password'  => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ], 422);
        }

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Jika user tidak ditemukan atau password salah
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "success" => false,
                "message" => "Email atau password salah"
            ], 401);
        }

        // Generate Token (Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        // Response sukses
        return response()->json([
            "success" => true,
            "message" => "Login berhasil",
            "token"   => $token,
            "user"    => $user
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => $e->getMessage()
        ], 500);
    }
}

    public function register(Request $request)
    {
        try {
                    $validator = Validator::make($request->all(), [
            'nama'         => 'required',
            'email'         => 'required',
            'password'      => 'required',
            'password_confirmation' => 'confirmed:password'
        ]);

        //check if validation fails
        if ($validator->fails()) {
                    $response=[
            "success" => false,
            "massage" => $validator->errors()
        ];

            return response()->json($response, 422);
        }

        //upload image
        // $image = $request->file('image');
        // $image->storeAs('products', $image->hashName());

        //create product
        $user = User::create([
            'nama'          => $request->nama,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            // 'price'         => $request->price,
            // 'stock'         => $request->stock,
        ]);
        $response=[
            "success" => true,
            "massage" => "Register Berhasil"
        ];

        //return response
        return response()->json($response, 200);

            
        } catch (\Exception $e) {
        $response=[
            "success" => false,
            "massage" => $e->getMessage()
        ];

        //return response
        return response()->json($response, 200);
        }
        //define validation rules
    }
    //
}
