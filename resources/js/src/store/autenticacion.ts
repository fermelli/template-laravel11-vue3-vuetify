import router from "@/router";
import autenticacionService from "@/services/autenticacion.service";
import type { Usuario } from "@/types/usuario";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAutenticacionStore = defineStore("autenticacion", () => {
    const usuario = ref<Usuario | null>(null);

    const usuarioAutenticado = computed<Usuario | null>(() => {
        return usuario.value;
    });

    function setUsuario(usuarioDatos: Usuario | null) {
        usuario.value = usuarioDatos;
    }

    async function obtenerUsuarioAutenticado() {
        try {
            const response = await autenticacionService.usuarioAutenticado();
            const data = response.data;

            setUsuario(data?.datos);

            return data?.datos;
        } catch {
            setUsuario(null);
        }
    }

    async function logout() {
        return autenticacionService
            .logout()
            .then(() => {
                localLogout();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function localLogout() {
        setUsuario(null);

        if (router.currentRoute.value.name !== "login") {
            router.push({ name: "login" });
        }
    }

    return {
        usuario,
        usuarioAutenticado,
        setUsuario,
        obtenerUsuarioAutenticado,
        logout,
        localLogout,
    };
});
