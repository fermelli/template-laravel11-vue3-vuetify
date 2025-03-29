<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const rutasPermitidasPorRol = computed(
    () => store.getters["rutasMenuNavegacion/rutasPermitidasPorRol"],
);
</script>

<template>
    <v-navigation-drawer
        :model-value="modelValue"
        location="left"
        @update:model-value="emit('update:modelValue', $event)"
    >
        <v-list open-strategy="multiple">
            <v-list-subheader>Menú Principal</v-list-subheader>

            <v-divider />

            <template
                v-for="(ruta, indice) in rutasPermitidasPorRol"
                :key="indice"
            >
                <v-list-group v-if="'rutasHijas' in ruta" :value="ruta.texto">
                    <template #activator="{ props: bindProps }">
                        <v-list-item
                            v-bind="bindProps"
                            density="compact"
                            :prepend-icon="ruta.icono"
                            :title="ruta.texto"
                        />
                    </template>

                    <v-list-item
                        v-for="(rutaHija, indiceHija) in ruta.rutasHijas"
                        :key="indiceHija"
                        link
                        density="compact"
                        :to="rutaHija.to"
                        :prepend-icon="rutaHija.icono"
                        :title="rutaHija.texto"
                    />
                </v-list-group>

                <v-list-item
                    v-else
                    :key="indice"
                    link
                    :to="ruta.to"
                    density="compact"
                    :prepend-icon="ruta.icono"
                    :title="ruta.texto"
                />
            </template>
        </v-list>
    </v-navigation-drawer>
</template>
