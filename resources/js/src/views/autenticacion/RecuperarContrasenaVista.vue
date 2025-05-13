<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
    confirmarPassword,
    correoElectronico,
    requerido,
    password,
} from "../../utils/validaciones";
import { useRoute } from "vue-router";
import autenticacionService from "@/services/autenticacion.service";
import RecuperarContrasenaDialog from "./components/RecuperarContrasenaDialog.vue";

const route = useRoute();

const props = defineProps({
    token: {
        type: String,
        required: true,
    },
});

const formularioValido = ref(false);
const enviandoFormulario = ref(false);
const passwordMostrado = ref(false);
const formulario = reactive({
    correo_electronico: "",
    password: "",
    password_confirmation: "",
    token: props.token,
});
const contrasenaActualizadaExitosamente = ref(false);
const reglasValidacion = {
    requerido,
    correoElectronico,
    password,
    confirmarPassword,
};

async function actualizarContrasena() {
    if (!formularioValido.value) {
        return;
    }

    enviandoFormulario.value = true;

    try {
        await autenticacionService.resetPassword(formulario);

        contrasenaActualizadaExitosamente.value = true;
    } catch (error) {
        console.log(error);

        contrasenaActualizadaExitosamente.value = false;
    } finally {
        enviandoFormulario.value = false;
    }
}

onMounted(() => {
    if (route.query.correo_electronico) {
        formulario.correo_electronico = route.query
            .correo_electronico as string;
    }
});
</script>

<template>
    <v-row dense>
        <v-col cols="12">
            <v-form
                v-model="formularioValido"
                autocomplete="off"
                :disabled="enviandoFormulario"
                @submit.prevent="actualizarContrasena"
            >
                <v-card class="mx-auto py-4" max-width="440">
                    <v-card-title>
                        <span class="text-h6">Actualizar Contraseña</span>
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
                            :disabled="!!formulario.correo_electronico"
                            required
                            clearable
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
                    </v-card-text>

                    <v-card-actions
                        class="d-flex flex-wrap justify-space-between px-4"
                    >
                        <v-btn
                            class="mb-2"
                            type="submit"
                            color="primary"
                            variant="tonal"
                            density="comfortable"
                            prepend-icon="mdi-lock"
                            block
                            :loading="enviandoFormulario"
                        >
                            Actualizar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>

    <RecuperarContrasenaDialog v-model="contrasenaActualizadaExitosamente" />
</template>
