import { FirebaseError } from "firebase/app";

export const handleFirebaseAuthError = (error : FirebaseError) => {
    switch (error.code) {
        case "auth/invalid-email":
            return "Correo electrónico no válido.";
        case "auth/user-disabled":
            return "Usuario deshabilitado.";
        case "auth/user-not-found":
            return "Usuario no encontrado.";
        case "auth/wrong-password":
            return "Contraseña incorrecta.";
        case "auth/email-already-in-use":
            return "El correo ya está en uso.";
        case "auth/operation-not-allowed":
            return "Operación no permitida.";
        case "auth/weak-password":
            return "Contraseña demasiado débil.";
        case "auth/too-many-requests":
            return "Demasiados intentos. Intente más tarde.";
        case "auth/invalid-credential":
            return "Credencial inválida.";
        case "auth/credential-already-in-use":
            return "Esta credencial ya está asociada a otra cuenta.";
        case "auth/account-exists-with-different-credential":
            return "Ya existe una cuenta con otra credencial.";
        case "auth/requires-recent-login":
            return "Debe iniciar sesión de nuevo para esta operación.";
        case "auth/provider-already-linked":
            return "El proveedor ya está vinculado a la cuenta.";
        case "auth/no-such-provider":
            return "Proveedor no vinculado a la cuenta.";
        case "auth/network-request-failed":
            return "Error de red. Revise su conexión.";
        case "auth/cancelled-popup-request":
            return "Solicitud de popup cancelada.";
        case "auth/popup-closed-by-user":
            return "El popup se cerró antes de completar la operación.";
        case "auth/popup-blocked":
            return "El popup fue bloqueado por el navegador.";
        case "auth/unauthorized-domain":
            return "Dominio no autorizado para esta operación.";
        case "auth/invalid-verification-code":
            return "Código de verificación inválido.";
        case "auth/missing-verification-code":
            return "Falta el código de verificación.";
        case "auth/invalid-phone-number":
            return "Número de teléfono inválido.";
        case "auth/missing-phone-number":
            return "Falta el número de teléfono.";
        case "auth/quota-exceeded":
            return "Se excedió la cuota de solicitudes. Intente más tarde.";
        case "auth/operation-not-supported-in-this-environment":
            return "Operación no soportada en este entorno.";
        default:
            return "Ocurrió un error desconocido.";
    }
};
