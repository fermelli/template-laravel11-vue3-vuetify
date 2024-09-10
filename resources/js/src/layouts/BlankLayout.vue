<script>
export default {
    name: "BlankLayout",
};
</script>

<template>
    <v-layout>
        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>

        <v-footer app>
            <span class="d-inline-block mx-auto"> &copy; 2024 - SUCRE </span>
        </v-footer>
    </v-layout>
</template>
