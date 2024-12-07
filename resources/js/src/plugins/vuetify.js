import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { es } from "vuetify/locale";
import temaClaro from "./tema-claro";
import temaOscuro from "./tema-oscuro";

const vuetify = createVuetify({
    components,
    directives,
    locale: {
        locale: "es",
        fallback: "es",
        messages: {
            es,
        },
    },
    display: {
        mobileBreakpoint: "md",
    },
    theme: {
        defaultTheme: "temaClaro",
        themes: {
            temaClaro,
            temaOscuro,
        },
    },
});

export default vuetify;
