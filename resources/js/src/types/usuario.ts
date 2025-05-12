export type Rol = "administrador" | "usuario";

export interface Credentiales {
    correo_electronico: string;
    password: string;
}

export interface Registro {
    nombre: string;
    correo_electronico: string;
    password: string;
    password_confirmation: string;
}

export interface Usuario {
    id: number;
    nombre: string;
    correo_electronico: string;
    email_verified_at?: Date | null;
    two_factor_secret?: string | null;
    two_factor_recovery_codes: string | null;
    rol: Rol;
    creado_en: Date;
    actualizado_en: Date;
    eliminado_en: Date | null;
}

export interface ForgotPassword {
    correo_electronico: string;
}
