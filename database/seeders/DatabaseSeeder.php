<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Usuario::factory()->create([
            'nombre' => 'fermelli',
            'correo_electronico' => 'luisfernandosalgadomiguez@gmail.com',
            'password' => Hash::make('Password123$'),
            'rol' => Usuario::ROL_ADMINISTRADOR,
        ]);
    }
}
