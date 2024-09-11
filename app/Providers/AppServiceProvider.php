<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Response::macro(
            'jsonResponse',
            /**
             * Return a new JSON response from the application.
             *
             * @param string $mensaje
             * @param \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|\Illuminate\Support\Collection|array|null $datos
             * @param int $codigoEstado
             */
            function (
                string $mensaje,
                Collection | Model | SupportCollection | array | null  $datos,
                int $codigoEstado
            ) {

                return Response::json([
                    'mensaje' => $mensaje,
                    'datos' => $datos,
                    'codigo_estado' => $codigoEstado,
                    'errores' => null,
                ], $codigoEstado);
            }
        );
    }
}
