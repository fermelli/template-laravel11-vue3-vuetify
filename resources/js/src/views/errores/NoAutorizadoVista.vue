<script>
import { mapGetters } from "vuex";

export default {
    name: "NoEncontradoVista",
    computed: {
        ...mapGetters("autenticacion", ["usuarioAutenticado"]),
    },
};
</script>

<template>
    <v-responsive class="fill-height">
        <v-card max-width="600" class="mx-auto my-5" variant="tonal">
            <v-card-title>
                <h1 class="text-h5 text-center my-2">Sin permisos</h1>
            </v-card-title>

            <v-card-text>
                <v-img
                    width="600"
                    src="@/assets/imagenes/no-autorizado.svg"
                    class="mx-auto"
                    aspect-ratio="1"
                />

                <p>
                    No tienes permisos para acceder a esta página.
                    <router-link
                        class="d-inline-block"
                        :to="{ name: 'inicio' }"
                    >
                        Volver al inicio
                    </router-link>

                    <template v-if="!usuarioAutenticado">
                        |
                        <router-link
                            class="d-inline-block"
                            :to="{ name: 'login' }"
                        >
                            Ir a iniciar sesión
                        </router-link>
                    </template>
                </p>
            </v-card-text>
        </v-card>
    </v-responsive>
</template>
