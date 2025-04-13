import axios from "axios";
import service from "./service";
import type { Credentiales, Registro, Usuario } from "@/types/usuario";
import type { ApiResponse } from "../types/api-response";

export default {
    async login(credenciales: Credentiales) {
        await axios.get("/sanctum/csrf-cookie");

        return await service.post<ApiResponse<Usuario>>("/login", credenciales);
    },
    async usuarioAutenticado() {
        return await service.get<ApiResponse<Usuario>>("/usuario-autenticado");
    },
    async logout() {
        return await service.post<ApiResponse<Usuario>>("/logout");
    },
    async register(datos: Registro) {
        return await service.post<ApiResponse<Usuario>>("/register", datos);
    },
};
