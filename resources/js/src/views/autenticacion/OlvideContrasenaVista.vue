<script setup lang="ts">
import { reactive, ref } from "vue";
import { correoElectronico, requerido } from "../../utils/validaciones";
import type { ForgotPassword } from "@/types/usuario";
import autenticacionService from "@/services/autenticacion.service";
import OlvideContrasenaDialog from "./components/OlvideContrasenaDialog.vue";

const formularioValido = ref(false);
const enviandoFormulario = ref(false);
const formulario: ForgotPassword = reactive({
    correo_electronico: "",
});
const correoRecuperacionEnviadoExitosamente = ref(false);
const reglasValidacion = {
    requerido,
    correoElectronico,
};

async function enviarCorreoRecuperacion() {
    if (!formularioValido.value) {
        return;
    }

    enviandoFormulario.value = true;

    try {
        await autenticacionService.forgotPassword(formulario);

        correoRecuperacionEnviadoExitosamente.value = true;
    } catch (error) {
        console.error(error);

        correoRecuperacionEnviadoExitosamente.value = false;
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
                :disabled="
                    enviandoFormulario || correoRecuperacionEnviadoExitosamente
                "
                @submit.prevent="enviarCorreoRecuperacion"
            >
                <v-card class="mx-auto py-4" max-width="440">
                    <v-card-title>
                        <span class="text-h6">Olvidé mi contraseña</span>
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
                            prepend-icon="mdi-email"
                            block
                            :loading="enviandoFormulario"
                        >
                            Enviar correo de recuperación
                        </v-btn>

                        <div class="d-flex flex-column align-center">
                            <span class="text-caption"> Volver a </span>

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
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>

    <OlvideContrasenaDialog
        v-model="correoRecuperacionEnviadoExitosamente"
        :correo-electronico="formulario.correo_electronico"
    />
</template>
