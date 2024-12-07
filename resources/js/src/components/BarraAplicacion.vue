<script>
import { useTheme } from "vuetify";
import { mapGetters } from "vuex";

export default {
    name: "BarraAplicacion",
    emits: ["abrirCerrarMenuNavegacion"],
    setup() {
        const theme = useTheme();

        return {
            theme,
        };
    },
    computed: {
        ...mapGetters("autenticacion", ["usuarioAutenticado"]),
    },
    methods: {
        abrirCerrarMenuNavegacion() {
            this.$emit("abrirCerrarMenuNavegacion");
        },
        cerrarSesion() {
            this.$store.dispatch("autenticacion/logout");
        },
        cambiarTema() {
            const temaActual = this.theme.global.current.value.dark
                ? "temaClaro"
                : "temaOscuro";

            localStorage.setItem("tema-actual", temaActual);

            this.theme.global.name.value = temaActual;
        },
    },
};
</script>

<template>
    <v-app-bar color="primary" density="compact">
        <v-app-bar-nav-icon @click="abrirCerrarMenuNavegacion" />

        <v-img
            inline
            :width="36"
            aspect-ratio="1/1"
            alt="Logo"
            src="@/assets/imagenes/logo.png"
        />

        <v-app-bar-title>MIGRACIÓN NETSUITE</v-app-bar-title>

        <v-spacer />

        <v-menu v-if="usuarioAutenticado" location="bottom">
            <template #activator="{ props }">
                <v-btn v-bind="props" icon>
                    <v-avatar size="32" color="primary">
                        <v-icon icon="mdi-account-circle" />
                    </v-avatar>
                </v-btn>
            </template>

            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        {{ usuarioAutenticado.correo_electronico }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                        {{ usuarioAutenticado.rol.toUpperCase() }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider />

                <v-list-item link @click="cambiarTema">
                    <v-list-item-title>Cambiar tema</v-list-item-title>
                </v-list-item>

                <v-divider />

                <v-list-item link @click="cerrarSesion">
                    <v-list-item-title>Cerrar sesión</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
