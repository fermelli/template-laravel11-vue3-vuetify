import axios, { AxiosError, HttpStatusCode, type AxiosResponse } from "axios";
import { useToast } from "vue-toastification";
import router from "@/router";
import ListaErroresValidacion from "@/components/ListaErroresValidacion.vue";
import type { Rol, Usuario } from "@/types/usuario";
import {
    AdditionalHttpStatusCodes,
    type ApiResponse,
} from "@/types/api-response";
import { useAutenticacionStore } from "@/store/autenticacion";

const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

service.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<unknown>>) => {
        const toast = useToast();
        const mensaje = response.data?.mensaje;
        let mensajeAlternativo = "Petición realizada";

        if (response.status === HttpStatusCode.Ok) {
            mensajeAlternativo = "Petición realizada con éxito.";
        } else if (response.status === HttpStatusCode.Created) {
            mensajeAlternativo = "Creado con éxito.";
        } else if (response.status === HttpStatusCode.NoContent) {
            mensajeAlternativo = "Respuesta sin contenido.";
        } else if (response.status === HttpStatusCode.Accepted) {
            mensajeAlternativo = "Petición aceptada.";
        }

        if (mensaje) {
            toast.success(mensaje);
        } else {
            toast.success(mensajeAlternativo);
        }

        return response;
    },
    (error: AxiosError<ApiResponse<unknown>>) => {
        const toast = useToast();
        const autenticacionStore = useAutenticacionStore();

        if (error.code === AxiosError.ERR_BAD_RESPONSE) {
            if (
                error.response &&
                error.response.data &&
                error.response.data?.mensaje
            ) {
                toast.error(error.response.data.mensaje);
            } else {
                toast.error("Error de respuesta del servidor.");
            }
        } else if (error.code == AxiosError.ECONNABORTED) {
            toast.error(
                "La solicitud ha tardado demasiado tiempo en responder.",
            );
        } else if (
            error.response &&
            [
                HttpStatusCode.Unauthorized,
                AdditionalHttpStatusCodes.PageExpired,
            ].includes(error.response.status)
        ) {
            if (autenticacionStore.usuarioAutenticado) {
                autenticacionStore.localLogout();
            }

            toast.error(
                "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
            );
        } else if (
            error.response &&
            error.response.status === HttpStatusCode.UnprocessableEntity
        ) {
            const response = error?.response;
            const data = response?.data;
            const errores = data?.errores;
            const mensaje = data?.mensaje;

            if (errores && Object.keys(errores).length > 0) {
                const erroresPlanos = Object.values(errores).flat();

                toast.error({
                    component: ListaErroresValidacion,
                    props: {
                        errores: erroresPlanos,
                    },
                });
            } else {
                toast.error(mensaje);
            }
        } else if (
            error.response &&
            (error.response.status === HttpStatusCode.Forbidden ||
                error.response.status === HttpStatusCode.BadRequest ||
                error.response.status === HttpStatusCode.NotFound)
        ) {
            toast.error(error.response.data.mensaje);

            if (error.response.status === HttpStatusCode.Forbidden) {
                const usuarioAutenticado: Usuario | null =
                    autenticacionStore.usuarioAutenticado;
                const rolesAutorizados: Rol[] = ["administrador", "usuario"];

                if (
                    usuarioAutenticado?.rol &&
                    rolesAutorizados.includes(usuarioAutenticado.rol)
                ) {
                    router.push({ name: "inicio" });
                } else {
                    router.push({ name: "no-autorizado" });
                }
            }
        } else {
            toast.error("Se produjo un error inesperado");
        }

        return Promise.reject(error);
    },
);

export default service;
