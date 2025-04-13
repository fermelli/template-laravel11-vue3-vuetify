import type { Rol } from "@/types/usuario";
import rutasMenuNavegacion from "../../router/rutas-menu-navegacion";
import type { RutaMenuNavegacion } from "@/types/application";

export interface RutasMenuNavegacionState {
    rutas: RutaMenuNavegacion[];
}

const rutasMenuNavegacionStore = {
    namespaced: true,
    state(): RutasMenuNavegacionState {
        return {
            rutas: rutasMenuNavegacion,
        };
    },
    getters: {
        rutasMenuNavegacion(state) {
            return state.rutas;
        },
        rutasPermitidasPorRol(state, getters, rootState, rootGetters) {
            const rolUsuarioAutenticado: Rol =
                rootGetters["autenticacion/usuarioAutenticado"]?.rol;

            if (!rolUsuarioAutenticado) {
                return [];
            }

            const rutas = JSON.parse(
                JSON.stringify(state.rutas),
            ) as RutaMenuNavegacion[];

            return rutas.filter((ruta: RutaMenuNavegacion) => {
                const rutaEstaAutorizada = ruta.rolesAutorizados.includes(
                    rolUsuarioAutenticado,
                );

                if (ruta?.rutasHijas && ruta.rutasHijas?.length > 0) {
                    ruta.rutasHijas = ruta.rutasHijas.filter((rutaHija) =>
                        rutaHija.rolesAutorizados.includes(
                            rolUsuarioAutenticado,
                        ),
                    );
                }

                return rutaEstaAutorizada;
            });
        },
    },
};

export default rutasMenuNavegacionStore;
