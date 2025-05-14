<?php

use App\Http\Controllers\CustomNewPasswordController;
use App\Http\Controllers\CustomPasswordResetLinkController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/usuario-autenticado', [UsuarioController::class, 'autenticado'])
        ->name('usuario-autenticado');
});

Route::post('/forgot-password', [CustomPasswordResetLinkController::class, 'store'])
    ->name('password.email');

Route::post('/reset-password', [CustomNewPasswordController::class, 'store'])
    ->name('password.update');
