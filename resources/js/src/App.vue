<script setup lang="ts">
import { useTheme } from "vuetify";
import AppLayout from "./layouts/AppLayout.vue";
import BlankLayout from "./layouts/BlankLayout.vue";

const theme = useTheme();

function establecerTemaActual() {
    const temaActual = localStorage.getItem("tema-actual") || "temaClaro";

    theme.global.name.value = temaActual;
}

establecerTemaActual();
</script>

<template>
    <v-app>
        <AppLayout v-if="$route.meta.layout == 'app-layout'" />

        <BlankLayout v-else />
    </v-app>
</template>
