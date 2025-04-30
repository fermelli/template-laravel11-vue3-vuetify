import type { Usuario } from "@/types/usuario";
import type { RouteLocationNormalized } from "vue-router";

export function esRutaPublica(to: RouteLocationNormalized): boolean {
    const rutasPublicas = ["login", "registrarse"];

    return rutasPublicas.includes(to.name as string);
}

export function usuarioTieneAcceso(
    usuario: Usuario,
    to: RouteLocationNormalized,
): boolean {
    const rolesPermitidos = to.meta.rolesAutorizados;

    return rolesPermitidos ? rolesPermitidos.includes(usuario.rol) : false;
}
