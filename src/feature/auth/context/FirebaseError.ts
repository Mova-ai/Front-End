import { FirebaseError } from "firebase/app";
import { ErrorAuth } from "./AuthContext";

export const handleFirebaseAuthError = (error: FirebaseError): ErrorAuth => {
    let message = "";

    switch (error.code) {
        case "auth/invalid-email":
            message = "Correo electrónico no válido.";
            break;
        case "auth/user-disabled":
            message = "Usuario deshabilitado.";
            break;
        case "auth/user-not-found":
            message = "Usuario no encontrado.";
            break;
        case "auth/wrong-password":
            message = "Contraseña incorrecta.";
            break;
        case "auth/email-already-in-use":
            message = "El correo ya está en uso.";
            break;
        case "auth/operation-not-allowed":
            message = "Operación no permitida.";
            break;
        case "auth/weak-password":
            message = "Contraseña demasiado débil.";
            break;
        case "auth/too-many-requests":
            message = "Demasiados intentos. Intente más tarde.";
            break;
        case "auth/invalid-credential":
            message = "Credencial inválida.";
            break;
        case "auth/credential-already-in-use":
            message = "Esta credencial ya está asociada a otra cuenta.";
            break;
        case "auth/account-exists-with-different-credential":
            message = "Ya existe una cuenta con otra credencial.";
            break;
        case "auth/requires-recent-login":
            message = "Debe iniciar sesión de nuevo para esta operación.";
            break;
        case "auth/provider-already-linked":
            message = "El proveedor ya está vinculado a la cuenta.";
            break;
        case "auth/no-such-provider":
            message = "Proveedor no vinculado a la cuenta.";
            break;
        case "auth/network-request-failed":
            message = "Error de red. Revise su conexión.";
            break;
        case "auth/cancelled-popup-request":
            message = "Solicitud de popup cancelada.";
            break;
        case "auth/popup-closed-by-user":
            message = "El popup se cerró antes de completar la operación.";
            break;
        case "auth/popup-blocked":
            message = "El popup fue bloqueado por el navegador.";
            break;
        case "auth/unauthorized-domain":
            message = "Dominio no autorizado para esta operación.";
            break;
        case "auth/invalid-verification-code":
            message = "Código de verificación inválido.";
            break;
        case "auth/missing-verification-code":
            message = "Falta el código de verificación.";
            break;
        case "auth/invalid-phone-number":
            message = "Número de teléfono inválido.";
            break;
        case "auth/missing-phone-number":
            message = "Falta el número de teléfono.";
            break;
        case "auth/quota-exceeded":
            message = "Se excedió la cuota de solicitudes. Intente más tarde.";
            break;
        case "auth/operation-not-supported-in-this-environment":
            message = "Operación no soportada en este entorno.";
            break;
        default:
            message = "Ocurrió un error desconocido.";
    }

    return {
        isAuth: false,
        message,
    };
};

