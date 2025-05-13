<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Contracts\FailedPasswordResetLinkRequestResponse;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\LogoutResponse;
use Laravel\Fortify\Contracts\RegisterResponse;
use Laravel\Fortify\Contracts\SuccessfulPasswordResetLinkRequestResponse;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->instance(LogoutResponse::class, new class implements LogoutResponse {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? Response::jsonResponse('Usuario desautenticado.', null, 200)
                    : redirect()->intended('/');
            }
        });

        $this->app->instance(RegisterResponse::class, new class implements RegisterResponse {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? Response::jsonResponse('Usuario registrado.', $request->user(), 201)
                    : redirect()->intended('/');
            }
        });

        $this->app->instance(LoginResponse::class, new class implements LoginResponse {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? Response::jsonResponse('Usuario autenticado.', $request->user(), 200)
                    : redirect()->intended('/');
            }
        });

        $this->app->instance(SuccessfulPasswordResetLinkRequestResponse::class, new class implements SuccessfulPasswordResetLinkRequestResponse {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? Response::jsonResponse(trans('passwords.sent'), null, 200)
                    : redirect()->intended('/');
            }
        });

        $this->app->instance(FailedPasswordResetLinkRequestResponse::class, new class implements FailedPasswordResetLinkRequestResponse {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? Response::jsonResponse(trans('passwords.user'), null, 400)
                    : redirect()->intended('/');
            }
        });

        $this->app->instance(\Laravel\Fortify\Contracts\PasswordResetResponse::class, new class implements \Laravel\Fortify\Contracts\PasswordResetResponse {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? Response::jsonResponse(trans('passwords.reset'), null, 200)
                    : redirect()->intended('/');
            }
        });

        $this->app->instance(\Laravel\Fortify\Contracts\FailedPasswordResetResponse::class, new class implements \Laravel\Fortify\Contracts\FailedPasswordResetResponse {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? Response::jsonResponseValidacionError(
                        'Error de validación.',
                        422,
                        [
                            'token' => [
                                trans('passwords.token'),
                            ],
                        ]
                    )
                    : redirect()->intended('/');
            }
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())) . '|' . $request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}
