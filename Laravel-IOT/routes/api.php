<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RiwayatController;

Route::post('/user', [UserController::class, 'register']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::prefix('riwayat')->group(function () {
    Route::post('/store', [RiwayatController::class, 'store']);
    Route::get('get', [RiwayatController::class,'getData']);
});
