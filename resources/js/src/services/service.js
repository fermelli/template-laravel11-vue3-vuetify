import axios, { HttpStatusCode } from "axios";
import { useToast } from "vue-toastification";
import store from "@/store";
import router from "@/router";
import ListaErroresValidacion from "@/components/ListaErroresValidacion.vue";
import {
    CODIGO_ERRORES,
    CODIGOS_ESTADO_HTTP_ADICIONALES,
    ROLES,
} from "../utils/constantes";

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
    (response) => {
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

        mensaje ? toast.success(mensaje) : toast.success(mensajeAlternativo);

        return response;
    },
    (error) => {
        const toast = useToast();

        if (error.code === CODIGO_ERRORES.ERR_BAD_RESPONSE) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.mensaje
            ) {
                toast.error(error.response.data.mensaje);
            } else {
                toast.error("Error de respuesta del servidor.");
            }
        } else if (error.code == CODIGO_ERRORES.ECONNABORTED) {
            toast.error(
                "La solicitud ha tardado demasiado tiempo en responder.",
            );
        } else if (
            error.response &&
            [
                HttpStatusCode.Unauthorized,
                CODIGOS_ESTADO_HTTP_ADICIONALES.PageExpired,
            ].includes(error.response.status)
        ) {
            if (store.getters["autenticacion/usuarioAutenticado"]) {
                store.dispatch("autenticacion/localLogout");
            }

            toast.error(
                "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
            );
        } else if (
            error.response &&
            error.response.status === HttpStatusCode.UnprocessableEntity
        ) {
            const { data } = error.response;

            if (data.errores && Object.keys(data.errores).length > 0) {
                const errores = Object.values(data.errores).flat();

                toast.error({
                    component: ListaErroresValidacion,
                    props: {
                        errores,
                    },
                });
            } else {
                toast.error(data.message);
            }
        } else if (
            error.response &&
            (error.response.status === HttpStatusCode.Forbidden ||
                error.response.status === HttpStatusCode.BadRequest ||
                error.response.status === HttpStatusCode.NotFound)
        ) {
            toast.error(error.response.data.mensaje);

            if (error.response.status === HttpStatusCode.Forbidden) {
                const usuarioAutenticado =
                    store.getters["autenticacion/usuarioAutenticado"];

                if (
                    [ROLES.administrador, ROLES.usuario].includes(
                        usuarioAutenticado?.rol,
                    )
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
