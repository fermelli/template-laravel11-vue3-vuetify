<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import autenticacionService from "@/services/autenticacion.service";
import { correoElectronico, requerido } from "../../utils/validaciones";
import type { Credentiales, Usuario } from "@/types/usuario";
import { useAutenticacionStore } from "@/store/autenticacion";

const router = useRouter();
const autenticacionStore = useAutenticacionStore();

const formularioValido = ref(false);
const enviandoFormulario = ref(false);
const passwordMostrado = ref(false);
const formulario: Credentiales = reactive({
    correo_electronico: "",
    password: "",
});
const reglasValidacion = {
    requerido,
    correoElectronico,
};

async function loguearUsuario() {
    if (!formularioValido.value) {
        return;
    }

    enviandoFormulario.value = true;

    try {
        await autenticacionService.login(formulario);

        const usuarioAutenticado: Usuario =
            await autenticacionStore.obtenerUsuarioAutenticado();

        if (usuarioAutenticado) {
            router.push({ name: "inicio" });
        }
    } catch (error) {
        console.log(error);
    } finally {
        enviandoFormulario.value = false;
    }
}
</script>

<template>
    <v-row dense>
        <v-col cols="12">
            <v-form
                v-model="formularioValido"
                autocomplete="off"
                :disabled="enviandoFormulario"
                @submit.prevent="loguearUsuario"
            >
                <v-card class="mx-auto py-4" max-width="440">
                    <v-card-title>
                        <span class="text-h6">Iniciar Sesión</span>
                    </v-card-title>

                    <v-card-text class="pb-0">
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
                    </v-card-text>

                    <v-card-actions
                        class="d-flex flex-wrap justify-space-between px-4"
                    >
                        <v-btn
                            class="mb-2"
                            type="submit"
                            variant="tonal"
                            color="primary"
                            density="comfortable"
                            prepend-icon="mdi-lock"
                            block
                            :loading="enviandoFormulario"
                        >
                            Ingresar
                        </v-btn>

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
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>
