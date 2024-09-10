<script>
export default {
    name: "NoEncontradoVista",
};
</script>

<template>
    <v-responsive class="fill-height">
        <v-card max-width="600" class="mx-auto my-5" variant="tonal">
            <v-card-title>
                <h1 class="text-h5 text-center my-2">Página no encontrada</h1>
            </v-card-title>

            <v-card-text>
                <v-img
                    width="600"
                    src="@/assets/imagenes/no-encontrado.svg"
                    class="mx-auto"
                    aspect-ratio="1"
                />

                <p>
                    La página que estás buscando no existe o no tienes permisos
                    para acceder a ella.
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
