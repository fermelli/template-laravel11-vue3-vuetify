export enum AdditionalHttpStatusCodes {
    PageExpired = 419,
}

export interface ApiErrores {
    [key: string]: string[];
}

export interface ApiResponse<T> {
    codigo_estado: number;
    mensaje: string;
    datos: T | null;
    errores: ApiErrores | null;
}
