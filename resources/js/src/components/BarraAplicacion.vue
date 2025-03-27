<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useTheme } from "vuetify";

const store = useStore();
const theme = useTheme();

const emit = defineEmits(["abrirCerrarMenuNavegacion"]);

const usuarioAutenticado = computed(() => {
    return store.getters["autenticacion/usuarioAutenticado"];
});

function abrirCerrarMenuNavegacion() {
    emit("abrirCerrarMenuNavegacion");
}

function cerrarSesion() {
    store.dispatch("autenticacion/logout");
}

function cambiarTema() {
    const temaActual = theme.global.current.value.dark
        ? "temaClaro"
        : "temaOscuro";

    localStorage.setItem("tema-actual", temaActual);

    theme.global.name.value = temaActual;
}
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

        <v-app-bar-title>
            Template Laravel 11 + Vue 3 + Vuetify 3
        </v-app-bar-title>

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
