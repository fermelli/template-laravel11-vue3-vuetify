<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
    abiertoNavegacion: {
        type: Boolean,
        default: false,
    },
});

const rutasPermitidasPorRol = computed(
    () => store.getters["rutasMenuNavegacion/rutasPermitidasPorRol"],
);

const abierto = ref(props.abiertoNavegacion);

watch(
    () => props.abiertoNavegacion,
    (valor) => {
        abierto.value = valor;
    },
);
</script>

<template>
    <v-navigation-drawer v-model="abierto" location="left">
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
