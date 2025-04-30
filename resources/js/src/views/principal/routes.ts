import type { RouteRecordRaw } from "vue-router";

export const rutasPrincipales: RouteRecordRaw[] = [
    {
        path: "/",
        name: "inicio",
        component: () => import("./InicioVista.vue"),
        meta: {
            layout: "app-layout",
            requiresAuth: true,
            rolesAutorizados: ["administrador", "usuario"],
        },
    },
];
