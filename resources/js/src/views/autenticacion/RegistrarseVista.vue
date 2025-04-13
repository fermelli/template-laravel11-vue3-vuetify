<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import AutenticacionService from "@/services/autenticacion.service";
import {
    confirmarPassword,
    correoElectronico,
    requerido,
    password,
} from "../../utils/validaciones";
import type { Registro } from "@/types/usuario";

const router = useRouter();

const formularioValido = ref(false);
const enviandoFormulario = ref(false);
const passwordMostrado = ref(false);
const formulario: Registro = reactive({
    nombre: "",
    correo_electronico: "",
    password: "",
    password_confirmation: "",
});
const reglasValidacion = {
    requerido,
    correoElectronico,
    password,
    confirmarPassword,
};

async function registrarUsuario() {
    if (!formularioValido.value) {
        return;
    }

    enviandoFormulario.value = true;

    try {
        await AutenticacionService.register(formulario);

        router.push({ name: "inicio" });
    } catch (error) {
        console.log(error);
    } finally {
        enviandoFormulario.value = false;
    }
}
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-form
                v-model="formularioValido"
                autocomplete="off"
                :disabled="enviandoFormulario"
                @submit.prevent="registrarUsuario"
            >
                <v-card class="mx-auto my-4" max-width="440">
                    <v-card-title>
                        <span class="text-h6">Registrarse</span>
                    </v-card-title>

                    <v-card-text>
                        <v-text-field
                            v-model="formulario.nombre"
                            class="mb-2"
                            label="Nombre"
                            name="nombre"
                            density="compact"
                            required
                            clearable
                            :rules="[reglasValidacion.requerido]"
                        />

                        <v-text-field
                            v-model="formulario.correo_electronico"
                            class="mb-2"
                            label="Correo Electrónico"
                            name="correo_electronico"
                            type="email"
                            density="compact"
                            required
                            clearable
                            :rules="[
                                reglasValidacion.requerido,
                                reglasValidacion.correoElectronico,
                            ]"
                        />

                        <v-text-field
                            v-model="formulario.password"
                            class="mb-2"
                            label="Password"
                            name="password"
                            density="compact"
                            :append-inner-icon="
                                passwordMostrado ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="passwordMostrado ? 'text' : 'password'"
                            :rules="[
                                reglasValidacion.requerido,
                                reglasValidacion.password,
                            ]"
                            clearable
                            @click:append-inner="
                                passwordMostrado = !passwordMostrado
                            "
                        />

                        <v-text-field
                            v-model="formulario.password_confirmation"
                            class="mb-2"
                            label="Confirmar Password"
                            name="password_confirmation"
                            density="compact"
                            :append-inner-icon="
                                passwordMostrado ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="passwordMostrado ? 'text' : 'password'"
                            :rules="[
                                reglasValidacion.requerido,
                                reglasValidacion.confirmarPassword(
                                    formulario.password,
                                ),
                            ]"
                            clearable
                            @click:append-inner="
                                passwordMostrado = !passwordMostrado
                            "
                        />

                        <v-card-actions class="d-flex justify-space-between">
                            <div class="d-flex flex-column align-center">
                                <span class="text-caption">
                                    ¿Ya tienes una cuenta?
                                </span>

                                <v-btn
                                    color="primary"
                                    density="compact"
                                    variant="text"
                                    size="small"
                                    :to="{ name: 'login' }"
                                >
                                    Iniciar sesión
                                </v-btn>
                            </div>
                            <v-btn
                                type="submit"
                                color="primary"
                                variant="tonal"
                                density="comfortable"
                                prepend-icon="mdi-account-plus"
                                :loading="enviandoFormulario"
                            >
                                Registrarse
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>
