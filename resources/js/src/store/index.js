import { createStore } from "vuex";
import autenticacionStore from "./modules/autenticacion";
import rutasMenuNavegacionStore from "./modules/rutas-menu-navegacion";

const store = createStore({
    modules: {
        autenticacion: autenticacionStore,
        rutasMenuNavegacion: rutasMenuNavegacionStore,
    },
});

export default store;
