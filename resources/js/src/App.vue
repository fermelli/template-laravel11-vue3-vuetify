<script>
import { useTheme } from "vuetify";
import AppLayout from "./layouts/AppLayout.vue";
import BlankLayout from "./layouts/BlankLayout.vue";
import { LAYOUTS } from "./utils/constantes";

export default {
    name: "App",
    components: { AppLayout, BlankLayout },
    setup() {
        const theme = useTheme();

        return {
            theme,
        };
    },
    data() {
        return {
            layouts: LAYOUTS,
        };
    },
    created() {
        this.establecerTemaActual();
    },
    methods: {
        establecerTemaActual() {
            const temaActual =
                localStorage.getItem("tema-actual") || "temaClaro";

            this.theme.global.name.value = temaActual;
        },
    },
};
</script>

<template>
    <v-app>
        <AppLayout v-if="$route.meta.layout == layouts.app" />

        <BlankLayout v-else />
    </v-app>
</template>
