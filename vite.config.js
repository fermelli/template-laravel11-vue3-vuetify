import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import eslint from "vite-plugin-eslint";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/src/main.js"],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls,
            },
        }),
        Vuetify(),
        eslint({
            cache: true,
            failOnWarning: true,
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/js/src", import.meta.url)),
        },
        extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
});
