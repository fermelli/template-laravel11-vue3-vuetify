<?php

namespace App\Actions\Fortify;

use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): Usuario
    {
        Validator::make($input, [
            'nombre' => ['required', 'string', 'max:255'],
            'correo_electronico' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(Usuario::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        return Usuario::create([
            'nombre' => $input['nombre'],
            'correo_electronico' => $input['correo_electronico'],
            'password' => Hash::make($input['password']),
        ]);
    }
}
