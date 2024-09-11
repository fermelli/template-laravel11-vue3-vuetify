import AutenticacionService from "../../services/autenticacion.service";
import router from "@/router";

const autenticacionStore = {
    namespaced: true,
    state() {
        return {
            usuario: null,
        };
    },
    mutations: {
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
    },
    actions: {
        async obtenerUsuarioAutenticado({ commit }) {
            try {
                const { data } =
                    await AutenticacionService.usuarioAutenticado();

                commit("setUsuario", data?.datos);

                return data?.datos;
            } catch (error) {
                commit("setUsuario", null);
            }
        },
        async logout({ commit }) {
            return AutenticacionService.logout()
                .then(() => {
                    commit("setUsuario", null);

                    if (router.currentRoute.name !== "login") {
                        router.push({ name: "login" });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    getters: {
        usuarioAutenticado(state) {
            return state.usuario;
        },
    },
};

export default autenticacionStore;
