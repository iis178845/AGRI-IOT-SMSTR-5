<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\KontrolController;
use App\Http\Controllers\API\KontrolManualController;
use App\Http\Controllers\API\RiwayatController;
use App\Http\Controllers\API\SensorController;


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

Route::post('/kontrol/update', [KontrolController::class, 'update']);
Route::get('/kontrol/get-status', [KontrolController::class, 'getStatus']);

