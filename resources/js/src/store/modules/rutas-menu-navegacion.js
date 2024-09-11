import rutasMenuNavegacion from "../../router/rutas-menu-navegacion";

const rutasMenuNavegacionStore = {
    namespaced: true,
    state() {
        return {
            rutas: rutasMenuNavegacion,
        };
    },
    getters: {
        rutasMenuNavegacion(state) {
            return state.rutas;
        },
        rutasPermitidasPorRol(state, getters, rootState, rootGetters) {
            const rolUsuarioAutenticado =
                rootGetters["autenticacion/usuarioAutenticado"]?.rol;

            if (!rolUsuarioAutenticado) {
                return [];
            }

            const rutas = JSON.parse(JSON.stringify(state.rutas));

            return rutas.filter((ruta) => {
                const rutaEstaAutorizada = ruta?.rolesAutorizados.includes(
                    rolUsuarioAutenticado,
                );

                if ("rutasHijas" in ruta && ruta.rutasHijas.length > 0) {
                    ruta.rutasHijas = ruta?.rutasHijas?.filter((rutaHija) =>
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
