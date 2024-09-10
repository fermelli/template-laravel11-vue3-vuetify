<script>
import AppLayout from "./layouts/AppLayout.vue";
import { LAYOUTS } from "./utils/constantes";

export default {
    name: "App",
    components: { AppLayout },
    data() {
        return {
            layouts: LAYOUTS,
        };
    },
};
</script>

<template>
    <v-app>
        <AppLayout />
    </v-app>
</template>
