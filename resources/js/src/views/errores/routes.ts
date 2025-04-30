import type { RouteRecordRaw } from "vue-router";

export const rutasErrores: RouteRecordRaw[] = [
    {
        path: "/no-autorizado",
        name: "no-autorizado",
        component: () => import("./NoAutorizadoVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "no-encontrado",
        component: () => import("./NoEncontradoVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
];
