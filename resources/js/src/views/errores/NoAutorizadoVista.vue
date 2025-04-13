<script setup lang="ts">
import type { Usuario } from "@/types/usuario";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const usuarioAutenticado = computed<Usuario>(() => {
    return store.getters["autenticacion/usuarioAutenticado"];
});
</script>

<template>
    <v-responsive class="fill-height">
        <v-card max-width="600" class="mx-auto my-5" variant="tonal">
            <v-card-title>
                <h1 class="text-h5 text-center my-2">Sin permisos</h1>
            </v-card-title>

            <v-card-text>
                <v-img
                    height="100%"
                    src="@/assets/imagenes/no-autorizado.svg"
                    class="mx-auto"
                    cover
                />

                <p class="text-center mt-5">
                    No tienes permisos para acceder a esta página.
                </p>

                <p class="text-center mt-5">
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
