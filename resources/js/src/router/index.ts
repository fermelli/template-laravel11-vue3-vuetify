import {
    createRouter,
    createWebHistory,
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

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const autenticacionStore = useAutenticacionStore();
    const usuarioAutenticado: Usuario | null =
        autenticacionStore.usuarioAutenticado;
    const rutaLogin: RouteLocationRaw = { name: "login" };
    const rutaInicio: RouteLocationRaw = { name: "inicio" };
    const rutaNoAutorizado: RouteLocationRaw = { name: "no-autorizado" };
    const esRutaLogin = to.name === "login";
    const esRutaRegistrarse = to.name === "registrarse";
    const esRutaNoAutorizado = to.name === "no-autorizado";

    if (requiresAuth && !usuarioAutenticado) {
        await autenticacionStore.obtenerUsuarioAutenticado();

        const usuarioAutenticado: Usuario | null =
            autenticacionStore.usuarioAutenticado;

        if (!usuarioAutenticado) {
            next(rutaLogin);
        } else {
            if (esRutaLogin) {
                next(rutaInicio);
            } else {
                if (
                    !to.meta?.rolesAutorizados?.includes(usuarioAutenticado.rol)
                ) {
                    next(rutaNoAutorizado);
                } else {
                    next();
                }
            }
        }
    } else {
        if (esRutaLogin || esRutaNoAutorizado || esRutaRegistrarse) {
            await autenticacionStore.obtenerUsuarioAutenticado();

            if (autenticacionStore.usuarioAutenticado) {
                next(rutaInicio);
            } else {
                next();
            }
        } else {
            next();
        }
    }
});

export default router;
