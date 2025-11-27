<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RiwayatController;
use App\Http\Controllers\API\SensorController;
use App\Http\Controllers\API\KontrolManualController;


Route::post('/user', [UserController::class, 'register']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::prefix('riwayat')->group(function () {
    Route::post('/store', [RiwayatController::class, 'store']);
    Route::get('get', [RiwayatController::class,'getData']);
        Route::get('get-sensor', [RiwayatController::class,'getDataSensor']);

});
Route::prefix('sensor')->group(function () {
    Route::post('/store', [SensorController::class, 'store']);
    Route::get('get', [SensorController::class,'getData']);
});

Route::get('/kontrol', [KontrolManualController::class, 'getStatus']);
Route::post('/kontrol/update', [KontrolManualController::class, 'update']);

// Untuk IoT device (GET data saja)
Route::get('/kontrol/device', [KontrolManualController::class, 'deviceSync']);