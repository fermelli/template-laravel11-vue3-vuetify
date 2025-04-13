<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UsuarioController extends Controller
{
    public function autenticado(Request $request)
    {
        return Response::jsonResponse('Datos del usuario autenticado.', $request->user(), 200);
    }
}
