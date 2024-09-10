import { LAYOUTS, ROLES } from "../utils/constantes";

export default [
    {
        path: "/",
        name: "inicio",
        component: () => import("../views/principal/InicioVista.vue"),
        meta: {
            layout: LAYOUTS.app,
            requiresAuth: true,
            rolesAutorizados: [ROLES.administrador, ROLES.usuario],
        },
    },
    {
        path: "/autenticacion/login",
        name: "login",
        component: () => import("../views/autenticacion/LoginVista.vue"),
        meta: {
            layout: LAYOUTS.blank,
            requiresAuth: false,
        },
    },
    {
        path: "/autenticacion/registrarse",
        name: "registrarse",
        component: () => import("../views/autenticacion/RegistrarseVista.vue"),
        meta: {
            layout: LAYOUTS.blank,
            requiresAuth: false,
        },
    },
    {
        path: "/no-autorizado",
        name: "no-autorizado",
        component: () => import("../views/errores/NoAutorizadoVista.vue"),
        meta: {
            layout: LAYOUTS.blank,
            requiresAuth: false,
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "no-encontrado",
        component: () => import("../views/errores/NoEncontradoVista.vue"),
        meta: {
            layout: LAYOUTS.blank,
            requiresAuth: false,
        },
    },
];
