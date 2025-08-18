import {Formulario} from "../context/AuthContext";

export default interface AuthContextType {
    user: boolean;
    login : (data: Formulario) => Object;
    loginWithGoogle : () => Object;
    register : (data : Formulario) => Object;
    verifiqueEmail: (email: string) => Object;
    recoveryPassword: (email: string) => Object;
    updatePassword : (data: Object) => Object;
    logout: () => void;
}