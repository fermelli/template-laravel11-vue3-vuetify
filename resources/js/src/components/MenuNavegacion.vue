<script>
import rutasMenuNavegacion from "./../router/rutas-menu-navegacion";

export default {
    name: "MenuNavegacion",
    props: {
        abiertoNavegacion: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            abierto: this.abiertoNavegacion,
            rutas: rutasMenuNavegacion,
        };
    },
    watch: {
        abiertoNavegacion(valor) {
            this.abierto = valor;
        },
    },
};
</script>

<template>
    <v-navigation-drawer v-model="abierto" location="left">
        <v-list open-strategy="multiple">
            <v-list-subheader>Menú Principal</v-list-subheader>

            <v-divider />

            <template v-for="(ruta, indice) in rutas" :key="indice">
                <v-list-group v-if="'rutasHijas' in ruta" :value="ruta.texto">
                    <template #activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            density="compact"
                            :prepend-icon="ruta.icono"
                            :title="ruta.texto"
                        />
                    </template>

                    <v-list-item
                        v-for="(rutaHija, indiceHija) in ruta.rutasHijas"
                        :key="indiceHija"
                        link
                        density="compact"
                        :to="rutaHija.to"
                        :prepend-icon="rutaHija.icono"
                        :title="rutaHija.texto"
                    />
                </v-list-group>

                <v-list-item
                    v-else
                    :key="indice"
                    link
                    :to="ruta.to"
                    density="compact"
                    :prepend-icon="ruta.icono"
                    :title="ruta.texto"
                />
            </template>
        </v-list>
    </v-navigation-drawer>
</template>
