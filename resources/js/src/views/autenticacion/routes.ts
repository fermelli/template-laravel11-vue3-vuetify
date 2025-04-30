import type { RouteRecordRaw } from "vue-router";

export const rutasAutenticacion: RouteRecordRaw[] = [
    {
        path: "/autenticacion/login",
        name: "login",
        component: () => import("./LoginVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
    {
        path: "/autenticacion/registrarse",
        name: "registrarse",
        component: () => import("./RegistrarseVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
];
