<?php

namespace App\Actions\Fortify;

use App\Models\Usuario;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UpdateUserProfileInformation implements UpdatesUserProfileInformation
{
    /**
     * Validate and update the given user's profile information.
     *
     * @param  array<string, string>  $input
     */
    public function update(Usuario $usuario, array $input): void
    {
        Validator::make($input, [
            'nombre' => ['required', 'string', 'max:255'],

            'correo_electronico' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('usuarios')->ignore($usuario->id),
            ],
        ])->validateWithBag('updateProfileInformation');

        if (
            $input['correo_electronico'] !== $usuario->correo_electronico &&
            $usuario instanceof MustVerifyEmail
        ) {
            $this->updateVerifiedUser($usuario, $input);
        } else {
            $usuario->forceFill([
                'nombre' => $input['nombre'],
                'correo_electronico' => $input['correo_electronico'],
            ])->save();
        }
    }

    /**
     * Update the given verified user's profile information.
     *
     * @param  array<string, string>  $input
     */
    protected function updateVerifiedUser(Usuario $usuario, array $input): void
    {
        $usuario->forceFill([
            'nombre' => $input['nombre'],
            'correo_electronico' => $input['correo_electronico'],
            'email_verified_at' => null,
        ])->save();

        $usuario->sendEmailVerificationNotification();
    }
}
