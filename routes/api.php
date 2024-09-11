<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/usuario-autenticado', function (Request $request) {
        return response()->jsonResponse('Datos del usuario autenticado.', $request->user(), 200);
    });
});
