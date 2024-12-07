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
        async logout({ dispatch }) {
            return AutenticacionService.logout()
                .then(() => {
                    dispatch("localLogout");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        localLogout({ commit }) {
            commit("setUsuario", null);

            if (router.currentRoute.name !== "login") {
                router.push({ name: "login" });
            }
        },
    },
    getters: {
        usuarioAutenticado(state) {
            return state.usuario;
        },
    },
};

export default autenticacionStore;
