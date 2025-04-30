import { useAutenticacionStore } from "@/store/autenticacion";
import type { Usuario } from "@/types/usuario";
import type {
    NavigationGuardNext,
    RouteLocationNormalizedGeneric,
    RouteLocationNormalizedLoadedGeneric,
    RouteLocationRaw,
} from "vue-router";
import { esRutaPublica, usuarioTieneAcceso } from "./helpers";

export const authGuard = async (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext,
) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const autenticacionStore = useAutenticacionStore();

    let usuario: Usuario | null = autenticacionStore.usuarioAutenticado;

    if (!usuario) {
        await autenticacionStore.obtenerUsuarioAutenticado();

        usuario = autenticacionStore.usuarioAutenticado;
    }

    const rutaLogin: RouteLocationRaw = { name: "login" };
    const rutaInicio: RouteLocationRaw = { name: "inicio" };
    const rutaNoAutorizado: RouteLocationRaw = { name: "no-autorizado" };

    if (requiresAuth && !usuario) {
        return next(rutaLogin);
    }

    if (usuario && esRutaPublica(to)) {
        return next(rutaInicio);
    }

    if (requiresAuth && usuario && !usuarioTieneAcceso(usuario, to)) {
        return next(rutaNoAutorizado);
    }

    return next();
};
