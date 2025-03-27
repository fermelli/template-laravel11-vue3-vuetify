<script setup>
import BarraAplicacion from "@/components/BarraAplicacion.vue";
import MenuNavegacion from "@/components/MenuNavegacion.vue";
import { ref } from "vue";

const abiertoNavegacion = ref(false);
</script>

<template>
    <v-layout>
        <BarraAplicacion
            @abrir-cerrar-menu-navegacion="
                abiertoNavegacion = !abiertoNavegacion
            "
        />

        <MenuNavegacion :abierto-navegacion="abiertoNavegacion" />

        <v-main scrollable>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-layout>
</template>
