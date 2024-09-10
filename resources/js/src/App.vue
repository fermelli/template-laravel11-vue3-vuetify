<script>
import AppLayout from "./layouts/AppLayout.vue";
import BlankLayout from "./layouts/BlankLayout.vue";
import { LAYOUTS } from "./utils/constantes";

export default {
    name: "App",
    components: { AppLayout, BlankLayout },
    data() {
        return {
            layouts: LAYOUTS,
        };
    },
};
</script>

<template>
    <v-app>
        <AppLayout v-if="$route.meta.layout == layouts.app" />

        <BlankLayout v-else />
    </v-app>
</template>
