<script lang="ts" setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    correoElectronico: {
        type: String,
        required: true,
    },
});

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
    <v-dialog
        :model-value="modelValue"
        width="auto"
        persistent
        @update:model-value="emit('update:modelValue', $event)"
    >
        <v-card class="mx-auto py-4" max-width="400">
            <v-card-title>
                <span class="text-h6">Correo enviado</span>
            </v-card-title>

            <v-card-text class="pb-0">
                <p>
                    Se ha enviado un correo electrónico a
                    <strong>{{ correoElectronico }}</strong> con instrucciones
                    para restablecer su contraseña.
                </p>
            </v-card-text>

            <v-card-actions class="d-flex flex-wrap justify-space-between px-4">
                <v-btn
                    variant="tonal"
                    color="primary"
                    density="comfortable"
                    prepend-icon="mdi-check"
                    block
                    :to="{ name: 'login' }"
                >
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
