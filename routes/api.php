<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/usuario-autenticado', [UsuarioController::class, 'autenticado'])
        ->name('usuario-autenticado');
});
