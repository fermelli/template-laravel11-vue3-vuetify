<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const temaClaro = 'temaClaro';
            const temaActual = localStorage.getItem('tema-actual') || temaClaro;

            document.body.classList.add(temaActual);
        });
    </script>

    @vite('resources/js/src/main.js ')

    <style>
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }

        body {
            margin: 0;
        }

        .app-container-spinner {
            position: absolute;
            z-index: 99999;
            width: 100vw;
            height: 100vh;
            display: grid;
            place-items: center;
        }

        .temaClaro .app-container-spinner {
            background-color: #F5F5F5;
        }

        .temaOscuro .app-container-spinner {
            background-color: #121B22;
        }

        .app-spinner {
            width: 24px;
            height: 24px;
            border-radius: 50%;

            animation: spin 1s ease-in-out infinite;
        }

        .temaClaro .app-spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #128C7E;
        }

        .temaOscuro .app-spinner {
            border: 4px solid rgba(255, 255, 255, 0.25);
            border-left-color: #128C7E;
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    </style>

</head>

<body>
    <noscript>
        <strong>Lo sentimos, pero para que la aplicación funcione correctamente, es necesario que habilites JavaScript en tu navegador.</strong>
    </noscript>

    <div
        id="app-loading"
        class="app-container-spinner">
        <div class="app-spinner"></div>
    </div>

    <div id="app"></div>
</body>

</html>