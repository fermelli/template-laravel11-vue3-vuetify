export const requerido = (valor) => {
    return !!valor || "Campo requerido.";
};

export const correoElectronico = (valor) => {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    return regex.test(valor) || "Correo electrónico inválido.";
};

export const password = (valor) => {
    return (
        (valor && valor.length >= 8) ||
        "El password debe tener al menos 8 caracteres"
    );
};

export const confirmarPassword = (valor, password) => {
    return valor === password || "Las contraseñas no coinciden";
};
