<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function autenticado(Request $request)
    {
        return response()->jsonResponse('Datos del usuario autenticado.', $request->user(), 200);
    }
}
