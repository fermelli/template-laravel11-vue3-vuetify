import type { RutaMenuNavegacion } from "@/types/application";

export default [
    {
        to: { name: "inicio" },
        icono: "mdi-home",
        texto: "Inicio",
        rolesAutorizados: ["administrador", "usuario"],
    },
] as RutaMenuNavegacion[];
