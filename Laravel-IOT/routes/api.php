<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\AuthController;


Route::post('/user',[UserController::class,"register"]);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
