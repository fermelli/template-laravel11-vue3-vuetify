import axios from "axios";
import service from "./service";

export default {
    async login(credenciales) {
        await axios.get("/sanctum/csrf-cookie");

        return await service.post("/login", credenciales);
    },
    async usuarioAutenticado() {
        return await service.get("/usuario-autenticado");
    },
    async logout() {
        return await service.post("/logout");
    },
    async register(datos) {
        return await service.post("/register", datos);
    },
};
