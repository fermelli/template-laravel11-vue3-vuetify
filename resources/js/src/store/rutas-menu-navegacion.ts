import rutasMenuNav from "@/router/rutas-menu-navegacion";
import type { Rol } from "@/types/usuario";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useAutenticacionStore } from "./autenticacion";
import type { RutaMenuNavegacion } from "@/types/application";

export const useRutasMenuNavegacionStore = defineStore(
    "rutasMenuNavegacion",
    () => {
        const rutas = ref(rutasMenuNav);

        const rutasMenuNavegacion = computed(() => {
            return rutas.value;
        });

        const rutasPermitidasPorRol = computed(() => {
            const autenticacionStore = useAutenticacionStore();
            const { usuarioAutenticado } = storeToRefs(autenticacionStore);
            const rolUsuarioAutenticado: Rol | undefined =
                usuarioAutenticado.value?.rol;

            if (!rolUsuarioAutenticado) {
                return [];
            }

            const rutasClonadas = JSON.parse(
                JSON.stringify(rutas.value),
            ) as RutaMenuNavegacion[];

            return rutasClonadas.filter((ruta: RutaMenuNavegacion) => {
                const rutaEstaAutorizada = ruta.rolesAutorizados.includes(
                    rolUsuarioAutenticado,
                );

                if (ruta?.rutasHijas && ruta?.rutasHijas?.length > 0) {
                    ruta.rutasHijas = ruta.rutasHijas.filter((rutaHija) =>
                        rutaHija.rolesAutorizados.includes(
                            rolUsuarioAutenticado,
                        ),
                    );
                }

                return rutaEstaAutorizada;
            });
        });

        return {
            rutas,
            rutasMenuNavegacion,
            rutasPermitidasPorRol,
        };
    },
);
