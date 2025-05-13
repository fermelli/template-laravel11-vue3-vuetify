<script lang="ts" setup>
import DialogoComponent from "./DialogoComponent.vue";

defineProps({
    titulo: {
        type: String,
        default: "Confirmación",
    },
    mostradoBotonCancelar: {
        type: Boolean,
        default: true,
    },
    textoBotonAceptar: {
        type: String,
        default: "Aceptar",
    },
    textoBotonCancelar: {
        type: String,
        default: "Cancelar",
    },
});

const emit = defineEmits<{
    (e: "aceptar"): void;
    (e: "cancelar"): void;
}>();
</script>

<template>
    <DialogoComponent>
        <v-card class="mx-auto py-4" max-width="400">
            <v-card-title>
                <span class="text-h6">{{ titulo }}</span>
            </v-card-title>

            <v-card-text class="pb-0">
                <slot name="default">
                    <p>Al hacer clic en "Aceptar", confirma la acción</p>
                </slot>
            </v-card-text>

            <v-card-actions class="d-flex flex-wrap justify-space-between px-4">
                <v-btn
                    v-if="mostradoBotonCancelar"
                    variant="tonal"
                    color="secondary"
                    density="comfortable"
                    prepend-icon="mdi-close"
                    @click="emit('cancelar')"
                >
                    {{ textoBotonCancelar }}
                </v-btn>

                <v-spacer />

                <v-btn
                    variant="tonal"
                    color="primary"
                    density="comfortable"
                    prepend-icon="mdi-check"
                    @click="emit('aceptar')"
                >
                    {{ textoBotonAceptar }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </DialogoComponent>
</template>
