<script setup>
import { useTheme } from "vuetify";
import AppLayout from "./layouts/AppLayout.vue";
import BlankLayout from "./layouts/BlankLayout.vue";
import { LAYOUTS } from "./utils/constantes";

const theme = useTheme();

function establecerTemaActual() {
    const temaActual = localStorage.getItem("tema-actual") || "temaClaro";

    theme.global.name.value = temaActual;
}

establecerTemaActual();
</script>

<template>
    <v-app>
        <AppLayout v-if="$route.meta.layout == LAYOUTS.app" />

        <BlankLayout v-else />
    </v-app>
</template>
