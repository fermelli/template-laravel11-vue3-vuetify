<script setup lang="ts"></script>

<template>
    <v-responsive class="fill-height">
        <v-card max-width="600" class="mx-auto py-4" variant="tonal">
            <v-card-title>
                <h1 class="text-h5 text-center">Página no encontrada</h1>
            </v-card-title>

            <v-card-text class="pb-0">
                <v-img
                    height="100%"
                    src="@/assets/imagenes/no-encontrado.svg"
                    class="mx-auto"
                    cover
                />

                <p class="text-center mt-5">
                    La página que estás buscando no existe o no tienes para
                    acceder a ella.
                </p>

                <p class="text-center mt-5">
                    <router-link
                        class="d-inline-block"
                        :to="{ name: 'inicio' }"
                    >
                        Volver al inicio
                    </router-link>
                </p>
            </v-card-text>
        </v-card>
    </v-responsive>
</template>
