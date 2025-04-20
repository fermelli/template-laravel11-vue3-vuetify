import type {
    StyleMaterialParams,
    ThemeDefaultParams,
} from "ag-grid-community";
import { POSITION, type PluginOptions } from "vue-toastification";

export const VUE_TOASTIFICATION_OPTIONS: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000,
    container: document.body,
    newestOnTop: true,
    maxToasts: 5,
};

export const THEME_LIGHT_PARAMS: Partial<
    ThemeDefaultParams & StyleMaterialParams
> = {
    backgroundColor: "#FFFFFF",
    headerBackgroundColor: "#F5F5F5",
    headerCellHoverBackgroundColor: "#E0E0E0",
    headerTextColor: "#212121",
    accentColor: "#128c7ebd",
    selectedRowBackgroundColor: "#128c7e23",
    oddRowBackgroundColor: "#F5F5F5",
    wrapperBorder: { style: "solid", width: 1, color: "#E0E0E0" },
    headerRowBorder: { style: "solid", width: 1, color: "#E0E0E0" },
    rowBorder: { style: "solid", width: 1, color: "#E0E0E0" },
    checkboxBorderWidth: 1,
};

export const THEME_DARK_PARAMS: Partial<
    ThemeDefaultParams & StyleMaterialParams
> = {
    backgroundColor: "#1E282E",
    headerBackgroundColor: "#121B22",
    headerCellHoverBackgroundColor: "#263238",
    headerTextColor: "#ECEFF1",
    accentColor: "#128c7ebd",
    selectedRowBackgroundColor: "#128c7e23",
    oddRowBackgroundColor: "#263238",
    wrapperBorder: { style: "solid", width: 1, color: "#121B22" },
    headerRowBorder: { style: "solid", width: 1, color: "#1E282E" },
    rowBorder: { style: "solid", width: 1, color: "#121B22" },
    rowHoverColor: "#263238",
    checkboxBorderWidth: 1,
};
