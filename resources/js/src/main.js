import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { VUE_TOASTIFICATION_OPTIONS } from "./utils/constantes";

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);
app.use(Toast, VUE_TOASTIFICATION_OPTIONS);

app.mount("#app");
