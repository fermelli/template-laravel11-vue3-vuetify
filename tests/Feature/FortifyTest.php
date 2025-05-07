<?php

namespace Tests\Feature;

use App\Models\Usuario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Testing\TestResponse;
use Laravel\Fortify\Fortify;
use Tests\TestCase;

class FortifyTest extends TestCase
{
    use RefreshDatabase;
    
    public function testEstaInstaladoFortify()
    {
        $this->assertTrue(class_exists(\Laravel\Fortify\Fortify::class));
    }

    public function testSeRegistranRutasDeFortify()
    {
        $this->assertTrue(app('router')->has('login.store'));
        $this->assertTrue(app('router')->has('logout'));
        $this->assertTrue(app('router')->has('register.store'));
    }

    public function testUsuarioPuedeIniciarSesionConCredencialesValidas()
    {
        $email = fake()->unique()->safeEmail();
        $rawPassword = 'Password123$';

        $usuario = Usuario::factory()->create([
            Fortify::username() => $email,
            'password' => bcrypt($rawPassword),
        ]);

        $response = $this->postJson(route('login.store'), [
            Fortify::username() => $email,
            'password' => $rawPassword,
        ]);

        $response->assertStatus(Response::HTTP_OK);
        
        $this->assertResponseJsonStructure($response);
        $this->assertResponseJson($response, $usuario);
        
        $this->assertAuthenticatedAs($usuario);
    }

    private function assertResponseJsonStructure(TestResponse $response)
    {
        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos' => [
                'id',
                'nombre',
                'correo_electronico',
                'email_verified_at',
                'two_factor_secret',
                'two_factor_recovery_codes',
                'rol',
                'creado_en',
                'actualizado_en',
                'eliminado_en',
            ],
            'errores',
        ]);
    }

    private function assertResponseJson(TestResponse $response, Usuario $usuario)
    {
        $response->assertJson([
            'mensaje' => 'Usuario autenticado.',
            'codigo_estado' => Response::HTTP_OK,
            'datos' => $this->expectedDatosUsuario($usuario),
            'errores' => null,
        ]);
    }

    private function expectedDatosUsuario(Usuario $usuario): array
    {
        return [
            'id' => $usuario->id,
            'nombre' => $usuario->nombre,
            'correo_electronico' => $usuario->correo_electronico,
            'email_verified_at' => $usuario->email_verified_at?->toISOString(),
            'two_factor_secret' => $usuario->two_factor_secret,
            'two_factor_recovery_codes' => $usuario->two_factor_recovery_codes,
            'rol' => $usuario->rol,
            'creado_en' => $usuario->creado_en->toISOString(),
            'actualizado_en' => $usuario->actualizado_en->toISOString(),
            'eliminado_en' => $usuario->eliminado_en?->toISOString(),
        ];
    }

    public function testUsuarioNoPuedeIniciarSesionConNombreDeUsuarioIncorrecto()
    {
        $email = fake()->unique()->safeEmail();
        $rawPassword = 'Password123$';

        Usuario::factory()->create([
            Fortify::username() => $email,
            'password' => bcrypt($rawPassword),
        ]);

        $response = $this->postJson(route('login.store'), [
            Fortify::username() => 'InvalidEmail@gmail.com',
            'password' => $rawPassword,
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $this->assertResponseJsonStructureNoPuedeIniciarSesion($response);
        $this->assertResponseJsonNoPuedeIniciarSesion($response);

        $this->assertGuest();
    }

    public function testUsuarioNoPuedeIniciarSesionConPasswordIncorrecto()
    {
        $email = fake()->unique()->safeEmail();
        $rawPassword = 'Password123$';

        Usuario::factory()->create([
            Fortify::username() => $email,
            'password' => bcrypt($rawPassword),
        ]);

        $response = $this->postJson(route('login.store'), [
            Fortify::username() => $email,
            'password' => 'InvalidPassword',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $this->assertResponseJsonStructureNoPuedeIniciarSesion($response);
        $this->assertResponseJsonNoPuedeIniciarSesion($response);

        $this->assertGuest();
    }

    private function assertResponseJsonStructureNoPuedeIniciarSesion(TestResponse $response)
    {
        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos',
            'errores' => [
                Fortify::username(),
            ],
        ]);
    }

    private function assertResponseJsonNoPuedeIniciarSesion(TestResponse $response)
    {
        $response->assertJson([
            'mensaje' => 'Error de validación.',
            'codigo_estado' => Response::HTTP_UNPROCESSABLE_ENTITY,
            'datos' => null,
            'errores' => [
                Fortify::username() => [
                    trans('auth.failed'),
                ],
            ],
        ]);
    }

    public function testUsuarioPuedeCerrarSesion()
    {
        $email = fake()->unique()->safeEmail();
        $rawPassword = 'Password123$';

        $usuario = Usuario::factory()->create([
            Fortify::username() => $email,
            'password' => bcrypt($rawPassword),
        ]);

        $response = $this->actingAs($usuario)->postJson(route('logout'));

        $response->assertStatus(Response::HTTP_OK);

        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos',
            'errores',
        ]);

        $response->assertJson([
            'mensaje' => 'Usuario desautenticado.',
            'codigo_estado' => Response::HTTP_OK,
            'datos' => null,
            'errores' => null,
        ]);
        
        $this->assertGuest();
    }

    public function testUsuarioNoPuedeCerrarSesionSinIniciarSesion()
    {
        $response = $this->postJson(route('logout'));

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);

        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos',
            'errores',
        ]);

        $response->assertJson([
            'mensaje' => 'No autenticado.',
            'codigo_estado' => Response::HTTP_UNAUTHORIZED,
            'datos' => null,
            'errores' => null,
        ]);
    }

    public function testUsuarioPuedeRegistrarCuenta()
    {
        $nombre = 'Nombre de prueba';
        $email = fake()->unique()->safeEmail();
        $rawPassword = 'Password123$';

        $response = $this->postJson(route('register.store'), [
            'nombre' => $nombre,
            Fortify::username() => $email,
            'password' => $rawPassword,
            'password_confirmation' => $rawPassword,
        ]);

        $response->assertStatus(Response::HTTP_CREATED);


        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos',
            'errores',
        ]);
        
        $response->assertJson([
            'mensaje' => 'Usuario registrado.',
            'codigo_estado' => Response::HTTP_CREATED,
            'datos' => [
                'nombre' => $nombre,
                'correo_electronico' => $email,
            ],
            'errores' => null,
        ]);
    }

    public function testUsuarioNoPuedeRegistrarCuentaConNombreDeUsuarioExistente()
    {
        $nombre = 'Nombre de prueba';
        $email = fake()->unique()->safeEmail();
        $rawPassword = 'Password123$';

        Usuario::factory()->create([
            'nombre' => $nombre,
            Fortify::username() => $email,
        ]);

        $response = $this->postJson(route('register.store'), [
            'nombre' => $nombre,
            Fortify::username() => $email,
            'password' => $rawPassword,
            'password_confirmation' => $rawPassword,
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos',
            'errores' => [
                Fortify::username(),
            ],
        ]);

        $response->assertJson([
            'mensaje' => 'Error de validación.',
            'codigo_estado' => Response::HTTP_UNPROCESSABLE_ENTITY,
            'datos' => null,
            'errores' => [
                Fortify::username() => [
                    trans('validation.unique', [
                        'attribute' => Str::replace('_', ' ', Fortify::username()),
                    ]),
                ],
            ],
        ]);
    }

    public function testUsuarioNoPuedeRegistrarCuentaConCamposVacios()
    {
        $response = $this->postJson(route('register.store'), [
            'nombre' => null,
            Fortify::username() => null,
            'password' => null,
            'password_confirmation' => null,
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos',
            'errores',
        ]);

        $response->assertJson([
            'mensaje' => 'Error de validación.',
            'codigo_estado' => Response::HTTP_UNPROCESSABLE_ENTITY,
            'datos' => null,
            'errores' => [
                'nombre' => [
                    trans('validation.required', [
                        'attribute' => 'nombre',
                    ]),
                ],
                Fortify::username() => [
                    trans('validation.required', [
                        'attribute' => Str::replace('_', ' ', Fortify::username()),
                    ]),
                ],
                'password' => [
                    trans('validation.required', [
                        'attribute' => 'password',
                    ]),
                ],
            ],
        ]);
    }

    public function testUsuarioNoPuedeRegistrarCuentaConErroresDeValidacion()
    {
        $response = $this->postJson(route('register.store'), [
            'nombre' => Str::random(256),
            Fortify::username() => 'InvalidEmail' . Str::random(256),
            'password' => '123',
            'password_confirmation' => '456',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

        $response->assertJsonStructure([
            'mensaje',
            'codigo_estado',
            'datos',
            'errores',
        ]);

        $response->assertJson([
            'mensaje' => 'Error de validación.',
            'codigo_estado' => Response::HTTP_UNPROCESSABLE_ENTITY,
            'datos' => null,
            'errores' => [
                'nombre' => [
                    trans('validation.max.string', [
                        'attribute' => 'nombre',
                        'max' => 255,
                    ]),
                ],
                Fortify::username() => [
                    trans('validation.email', [
                        'attribute' => Str::replace('_', ' ', Fortify::username()),
                    ]),
                    trans('validation.max.string', [
                        'attribute' => Str::replace('_', ' ', Fortify::username()),
                        'max' => 255,
                    ]),
                ],
                'password' => [
                    trans('validation.min.string', [
                        'attribute' => 'password',
                        'min' => 8,
                    ]),
                    trans('validation.confirmed', [
                        'attribute' => 'password',
                    ]),
                ],
            ],
        ]);
    }
}
