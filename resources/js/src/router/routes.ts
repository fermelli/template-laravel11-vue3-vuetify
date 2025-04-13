import type { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/",
        name: "inicio",
        component: () => import("../views/principal/InicioVista.vue"),
        meta: {
            layout: "app-layout",
            requiresAuth: true,
            rolesAutorizados: ["administrador", "usuario"],
        },
    },
    {
        path: "/autenticacion/login",
        name: "login",
        component: () => import("../views/autenticacion/LoginVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
    {
        path: "/autenticacion/registrarse",
        name: "registrarse",
        component: () => import("../views/autenticacion/RegistrarseVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
    {
        path: "/no-autorizado",
        name: "no-autorizado",
        component: () => import("../views/errores/NoAutorizadoVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "no-encontrado",
        component: () => import("../views/errores/NoEncontradoVista.vue"),
        meta: {
            layout: "blank-layout",
            requiresAuth: false,
        },
    },
] as RouteRecordRaw[];
