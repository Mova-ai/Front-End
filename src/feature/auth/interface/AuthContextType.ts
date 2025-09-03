
import { UsuarioInterface } from "../UserState";
import { Formulario, ErrorAuth } from "../context/AuthContext";

export default interface AuthContextType {
    user: UsuarioInterface | null;
    loading: boolean;
    register: (data: Formulario) => Promise<ErrorAuth>;
    login: (data: Formulario) => Promise<ErrorAuth>;
    logout: () => Promise<void>;
    recoveryPassword: (email: string) => Promise<ErrorAuth>;
    verifiqueEmail: () => Promise<ErrorAuth>;
    updateUserProfile: (displayName: string, photoURL?: string) => Promise<ErrorAuth>;
    token: string | null;


}
