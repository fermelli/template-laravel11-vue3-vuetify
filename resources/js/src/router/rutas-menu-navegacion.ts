import { ROLES } from "../utils/constantes";

export default [
    {
        to: { name: "inicio" },
        icono: "mdi-home",
        texto: "Inicio",
        rolesAutorizados: [ROLES.administrador, ROLES.usuario],
    },
];
