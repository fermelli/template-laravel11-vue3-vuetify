# Template Laravel 11 - Vue 3 - Vuetify 3

Esta es una plantilla de Laravel 11 con Vue 3 y Vuetify 3.

## Requisitos

-   PHP >= 8.2
-   Composer >= 2.7.8
-   Node.js >= 18
-   NPM >= 10 or Yarn >= 1.22 (Recomendado)

## Instalacion

1. Clonar el repositorio
2. Instalar las dependencias con `composer install`
3. Instalar las dependencias de Node.js con `yarn install`
4. Copiar el archivo `.env.example` a `.env` con el comando `cp .env.example .env`
5. Configurar las variables de entorno en el archivo `.env`
6. Ejecutar el comando `php artisan key:generate`
7. Ejecutar el comando `php artisan migrate`
8. Ejecutar el comando `php artisan db:seed`
9. Iniciar el servidor con `php artisan serve` o si quieres ejecutar en una dirección específica (por ejemplo 192.168.1.20) `php artisan serve --host 192.168.1.20`
10. Compilar los assetas para desarrollo con `yarn dev` o para producción con `yarn build`. Para una dirección específica (por ejemplo 192.168.1.20) `yarn dev --host 192.168.1.20`.
11. Acceder a la dirección del servidor en el navegador, por defecto es [http://localhost:8000](http://localhost:8000) o la dirección que hayas especificado en el paso 9 (por ejemplo [http://192.168.1.20:8000](http://192.168.1.20:8000)).
12. El usuario por defecto es `luisfernandosalgadomiguez@gmail.com` y la contraseña es `Password123$`. Puedes cambiar las credenciales en el archivo [DatabaseSeeder.php](database/seeders/DatabaseSeeder.php).
