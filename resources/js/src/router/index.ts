import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalizedGeneric,
    type RouteLocationNormalizedLoadedGeneric,
    type RouteLocationRaw,
} from "vue-router";
import routes from "./routes";
import type { Usuario } from "@/types/usuario";
import { useAutenticacionStore } from "@/store/autenticacion";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach(() => {
    const $appSpinner = document.getElementById("app-loading");

    if ($appSpinner) {
        $appSpinner.style.display = "none";
    }
});

router.beforeEach(
    async (
        to: RouteLocationNormalizedGeneric,
        from: RouteLocationNormalizedLoadedGeneric,
        next: NavigationGuardNext,
    ) => {
        const requiresAuth = to.matched.some(
            (record) => record.meta.requiresAuth,
        );
        const autenticacionStore = useAutenticacionStore();

        let usuario: Usuario | null = autenticacionStore.usuarioAutenticado;

        if (!usuario) {
            await autenticacionStore.obtenerUsuarioAutenticado();

            usuario = autenticacionStore.usuarioAutenticado;
        }

        const isAuthRoute = ["login", "registrarse"].includes(
            to.name as string,
        );

        const rutaLogin: RouteLocationRaw = { name: "login" };
        const rutaInicio: RouteLocationRaw = { name: "inicio" };
        const rutaNoAutorizado: RouteLocationRaw = { name: "no-autorizado" };

        if (requiresAuth && !usuario) {
            return next(rutaLogin);
        }

        if (usuario && isAuthRoute) {
            return next(rutaInicio);
        }

        if (requiresAuth && usuario && to.meta?.rolesAutorizados) {
            const rolesPermitidos = to.meta.rolesAutorizados;

            if (!rolesPermitidos.includes(usuario.rol)) {
                return next(rutaNoAutorizado);
            }
        }

        return next();
    },
);

export default router;
