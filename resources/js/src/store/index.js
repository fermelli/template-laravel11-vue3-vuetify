import { createStore } from "vuex";
import autenticacionStore from "./modules/autenticacion";

const store = createStore({
    modules: {
        autenticacion: autenticacionStore,
    },
});

export default store;
