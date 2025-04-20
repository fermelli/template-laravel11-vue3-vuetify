import { THEME_DARK_PARAMS, THEME_LIGHT_PARAMS } from "@/utils/constantes";
import { AG_GRID_LOCALE_ES } from "@ag-grid-community/locale";
import type {
    ColDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    RowSelectionOptions,
    SelectionChangedEvent,
    StyleMaterialParams,
    Theme,
    ThemeDefaultParams,
} from "ag-grid-community";
import {
    colorSchemeDark,
    colorSchemeLight,
    themeMaterial,
} from "ag-grid-community";
import { computed, ref, shallowRef } from "vue";
import { useTheme } from "vuetify";

export function useAgGrid<T>(
    rowSelectionMode: "singleRow" | "multiRow" = "singleRow",
    headerHeightValue: number = 30,
    rowHeightValue: number = 25,
) {
    const theme = useTheme();

    const headerHeight = ref<number>(headerHeightValue);
    const rowHeight = ref<number>(rowHeightValue);
    const localText = ref(AG_GRID_LOCALE_ES);

    const gridApi = shallowRef<GridApi<T> | null>(null);

    const defaultColDef = ref<ColDef>({
        flex: 1,
        floatingFilter: true,
        filter: false,
        sortable: false,
    });

    const gridOptions = ref<GridOptions<T>>({
        suppressScrollOnNewData: true,
        suppressMovableColumns: true,
    });

    const rowSelection = ref<RowSelectionOptions<T>>({
        mode: rowSelectionMode,
        enableClickSelection: true,
        hideDisabledCheckboxes: false,
        checkboxes: true,
    });

    const myThemeLight = themeMaterial
        .withPart(colorSchemeLight)
        .withParams(THEME_LIGHT_PARAMS);
    const myThemeDark = themeMaterial
        .withPart(colorSchemeDark)
        .withParams(THEME_DARK_PARAMS);

    const currentTheme = computed<
        Theme<ThemeDefaultParams & StyleMaterialParams>
    >(() => {
        return theme.global.current.value.dark ? myThemeDark : myThemeLight;
    });

    const itemSeleccionado = ref<T | null>();
    const itemsSeleccionados = ref<T[]>([]);

    function onGridReady(params: GridReadyEvent<T>) {
        gridApi.value = params.api;
    }

    function onSelectionChanged(event: SelectionChangedEvent<T>) {
        const filasSeleccionadas = event.api.getSelectedRows();

        if (rowSelectionMode === "singleRow")
            itemSeleccionado.value =
                filasSeleccionadas.length > 0 ? filasSeleccionadas[0] : null;

        if (rowSelectionMode === "multiRow")
            itemsSeleccionados.value = filasSeleccionadas;
    }

    return {
        currentTheme,
        headerHeight,
        rowHeight,
        localText,
        defaultColDef,
        gridOptions,
        rowSelection,
        itemSeleccionado,
        itemsSeleccionados,
        onGridReady,
        onSelectionChanged,
    };
}
