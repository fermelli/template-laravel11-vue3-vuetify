import { POSITION, type PluginOptions } from "vue-toastification";

export const VUE_TOASTIFICATION_OPTIONS: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000,
    container: document.body,
    newestOnTop: true,
    maxToasts: 5,
};
