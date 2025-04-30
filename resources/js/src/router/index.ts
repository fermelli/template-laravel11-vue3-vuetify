import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { authGuard } from "./guards/auth.guard";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach(() => {
    const $appSpinner = document.getElementById("app-loading");

    if ($appSpinner) {
        $appSpinner.style.display = "none";
    }
});

router.beforeEach(authGuard);

export default router;
