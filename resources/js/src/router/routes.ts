import { rutasAutenticacion } from "@/views/autenticacion/routes";
import { rutasErrores } from "@/views/errores/routes";
import { rutasPrincipales } from "@/views/principal/routes";
import type { RouteRecordRaw } from "vue-router";

export default [
    ...rutasPrincipales,
    ...rutasAutenticacion,
    ...rutasErrores,
] as RouteRecordRaw[];
