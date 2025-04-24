import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "vue-toastification/dist/index.css";
import { VUE_TOASTIFICATION_OPTIONS } from "./utils/constantes";
import "@/assets/scss/vue-toastification/index.scss";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);
app.use(Toast, VUE_TOASTIFICATION_OPTIONS);

ModuleRegistry.registerModules([AllCommunityModule]);

app.mount("#app");
