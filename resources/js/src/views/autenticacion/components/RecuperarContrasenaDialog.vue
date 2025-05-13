<script lang="ts" setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false,
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
                <span class="text-h6">Contraseña actualizada</span>
            </v-card-title>

            <v-card-text class="pb-0">
                <p>
                    Se ha actualizado su contraseña correctamente. Puede iniciar
                    sesión con su nueva contraseña.
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
