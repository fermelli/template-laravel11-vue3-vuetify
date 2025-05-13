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
        scrollable
        @update:model-value="emit('update:modelValue', $event)"
    >
        <slot name="default" />
    </v-dialog>
</template>
