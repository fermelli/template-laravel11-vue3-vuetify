import type { RouteLocationRaw } from "vue-router";
import type { Rol } from "./usuario";

export type Layout = "app-layout" | "blank-layout";

export interface RutaMenuNavegacion {
    to: RouteLocationRaw;
    icono: string;
    texto: string;
    rolesAutorizados: Rol[];
    rutasHijas?: RutaMenuNavegacion[];
}
