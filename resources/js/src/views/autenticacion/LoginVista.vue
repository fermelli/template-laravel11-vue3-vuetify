<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import AutenticacionService from "@/services/autenticacion.service";
import { correoElectronico, requerido } from "../../utils/validaciones";

const store = useStore();
const router = useRouter();

const formularioValido = ref(false);
const enviandoFormulario = ref(false);
const passwordMostrado = ref(false);
const formulario = reactive({
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
        await AutenticacionService.login(formulario);

        const usuarioAutenticado = await store.dispatch(
            "autenticacion/obtenerUsuarioAutenticado",
        );

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
