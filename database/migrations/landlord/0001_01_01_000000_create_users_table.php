<?php

use App\Models\Usuario;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('correo_electronico')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('rol', [Usuario::ROL_ADMINISTRADOR, Usuario::ROL_USUARIO])->default(Usuario::ROL_USUARIO);

            $table->rememberToken();
            
            $table->timestamp('creado_en');
            $table->timestamp('actualizado_en');
            $table->timestamp('eliminado_en')->nullable();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('correo_electronico')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
