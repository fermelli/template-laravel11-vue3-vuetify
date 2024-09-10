<script>
export default {
    name: "BarraAplicacion",
    emits: ["abrirCerrarMenuNavegacion"],
    methods: {
        abrirCerrarMenuNavegacion() {
            this.$emit("abrirCerrarMenuNavegacion");
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
            src="./../assets/imagenes/logo.png"
        />

        <v-app-bar-title>MIGRACIÓN NETSUITE</v-app-bar-title>

        <v-spacer />

        <v-menu location="bottom">
            <template #activator="{ props }">
                <v-btn v-bind="props" icon>
                    <v-avatar size="32" color="primary">
                        <v-icon icon="mdi-account-circle" />
                    </v-avatar>
                </v-btn>
            </template>

            <v-list>
                <v-list-item>
                    <v-list-item-title> usuario@email.com </v-list-item-title>
                </v-list-item>

                <v-divider />

                <v-list-item link>
                    <v-list-item-title>Perfil de Usuario</v-list-item-title>
                </v-list-item>

                <v-divider />

                <v-list-item link>
                    <v-list-item-title>Cerrar sesión</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
