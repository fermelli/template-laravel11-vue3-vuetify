import type { Usuario } from "@/types/usuario";
import AutenticacionService from "../../services/autenticacion.service";
import router from "@/router";

export interface AutenticacionState {
    usuario: Usuario | null;
}

const autenticacionStore = {
    namespaced: true,
    state(): AutenticacionState {
        return {
            usuario: null,
        };
    },
    mutations: {
        setUsuario(state, usuario: Usuario | null) {
            state.usuario = usuario;
        },
    },
    actions: {
        async obtenerUsuarioAutenticado({ commit }) {
            try {
                const response =
                    await AutenticacionService.usuarioAutenticado();
                const data = response.data;

                commit("setUsuario", data?.datos);

                return data?.datos;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

            if (router.currentRoute.value.name !== "login") {
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
