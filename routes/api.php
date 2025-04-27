<?php

use App\Http\Controllers\Landlord\TenantController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::middleware(['tenant' ])->group(function () {
    Route::get('/usuario-autenticado', [UsuarioController::class, 'autenticado'])
        ->name('usuario-autenticado');
});

Route::apiResource('tenants', TenantController::class)
->except(['destroy']);
