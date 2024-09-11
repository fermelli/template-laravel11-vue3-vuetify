<script>
import AutenticacionService from "@/services/autenticacion.service";

export default {
    name: "LoginVista",
    data() {
        return {
            formularioValido: false,
            enviandoFormulario: false,
            passwordMostrado: false,
            formulario: {
                correo_electronico: "",
                password: "",
            },
            reglasValidacion: {
                requerido: (valor) => !!valor || "Campo requerido.",
                correoElectronico: (valor) => {
                    let regex =
                        /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
                    return regex.test(valor) || "Correo electrónico inválido.";
                },
            },
        };
    },
    methods: {
        async loguearUsuario() {
            if (!this.formularioValido) {
                return;
            }

            this.enviandoFormulario = true;

            try {
                await AutenticacionService.login(this.formulario);

                const usuarioAutenticado = await this.$store.dispatch(
                    "autenticacion/obtenerUsuarioAutenticado",
                );

                if (usuarioAutenticado) {
                    this.$router.push({ name: "inicio" });
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.enviandoFormulario = false;
            }
        },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-form
                v-model="formularioValido"
                autocomplete="off"
                :disabled="enviandoFormulario"
                @submit.prevent="loguearUsuario"
            >
                <v-card class="mx-auto my-4" max-width="440">
                    <v-card-title>
                        <span class="text-h6">Iniciar Sesión</span>
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            v-model="formulario.correo_electronico"
                            class="mb-2"
                            label="Correo electrónico"
                            name="correo_electronico"
                            type="email"
                            density="compact"
                            :rules="[
                                reglasValidacion.requerido,
                                reglasValidacion.correoElectronico,
                            ]"
                            required
                            clearable
                        />

                        <v-text-field
                            v-model="formulario.password"
                            class="mb-2"
                            label="Password"
                            name="password"
                            :type="passwordMostrado ? 'text' : 'password'"
                            :append-inner-icon="
                                passwordMostrado ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            density="compact"
                            :rules="[reglasValidacion.requerido]"
                            required
                            clearable
                            @click:append-inner="
                                passwordMostrado = !passwordMostrado
                            "
                        />

                        <v-card-actions class="d-flex justify-space-between">
                            <div class="d-flex flex-column align-center">
                                <span class="text-caption">
                                    ¿No tienes una cuenta?
                                </span>

                                <v-btn
                                    color="primary"
                                    density="compact"
                                    variant="text"
                                    size="small"
                                    :to="{ name: 'registrarse' }"
                                >
                                    Registrarse
                                </v-btn>
                            </div>

                            <v-btn
                                type="submit"
                                variant="tonal"
                                color="primary"
                                density="comfortable"
                                prepend-icon="mdi-lock"
                                :loading="enviandoFormulario"
                            >
                                Ingresar
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>
