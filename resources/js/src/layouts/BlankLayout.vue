<script setup></script>

<template>
    <v-layout>
        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>

        <v-footer app>
            <span class="d-inline-block mx-auto">
                &copy; {{ new Date().getFullYear() }} - SUCRE
            </span>
        </v-footer>
    </v-layout>
</template>
