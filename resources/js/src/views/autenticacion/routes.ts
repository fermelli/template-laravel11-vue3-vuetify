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
    {
        path: "/autenticacion/olvide-contrasena",
        name: "olvide-contrasena",
        component: () => import("./OlvideContrasenaVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
    {
        path: "/autenticacion/recuperar-contrasena/:token",
        name: "recuperar-contrasena",
        component: () => import("./RecuperarContrasenaVista.vue"),
        props: true,
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
];
