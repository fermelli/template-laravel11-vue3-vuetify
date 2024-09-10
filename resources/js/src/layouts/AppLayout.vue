<script>
import BarraAplicacion from "@/components/BarraAplicacion.vue";
import MenuNavegacion from "@/components/MenuNavegacion.vue";

export default {
    name: "AppLayout",
    components: { BarraAplicacion, MenuNavegacion },
    data() {
        return {
            abiertoNavegacion: false,
        };
    },
};
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
