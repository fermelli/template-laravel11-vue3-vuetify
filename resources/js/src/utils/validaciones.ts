export const requerido = (valor: string) => {
    return !!valor || "Campo requerido.";
};

export const correoElectronico = (valor: string) => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    return regex.test(valor) || "Correo electrónico inválido.";
};

export const password = (valor: string) => {
    return (
        (valor && valor.length >= 8) ||
        "El password debe tener al menos 8 caracteres"
    );
};

export const confirmarPassword = (password: string) => (valor: string) => {
    return valor === password || "Las contraseñas no coinciden";
};
