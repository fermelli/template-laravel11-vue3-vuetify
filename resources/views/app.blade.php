<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <link rel="shortcut icon" href="{{ asset('vue.svg') }}">

        @vite('resources/js/src/main.js')

    </head>
    
    <body>
        <noscript>
            <strong>Lo sentimos, pero para que la aplicación funcione correctamente, es necesario que habilites JavaScript en tu navegador.</strong>
        </noscript>

        <div id="app"></div>
    </body>
</html>