import type { Layout } from "@/types/application";
import type { Rol } from "@/types/usuario";
import "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        layout: Layout;
        requiresAuth: boolean;
        rolesAutorizados?: Rol[];
    }
}
