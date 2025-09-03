import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
// @ts-ignore
import AuthContextType from "../interface/AuthContextType";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail, sendEmailVerification, updateProfile, signOut
} from '@react-native-firebase/auth';
import {handleFirebaseAuthError} from "./FirebaseError";
import {UsuarioInterface} from "../UserState";
import {FirebaseError} from "firebase/app";


export interface Formulario {
    email: string;
    password: string;
}



export interface ErrorAuth {
    isAuth: boolean;
    message: string;

}

export interface LoginResult {
    isAuth: boolean;
    message: string;
    userData?: any;
}

interface AuthContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);




export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = getAuth();
    const [user, setUser] = useState<UsuarioInterface | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || '',
                    photoURL: firebaseUser.photoURL || '',
                    isAuth: true,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const register = async (data: Formulario): Promise<ErrorAuth> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await sendEmailVerification(auth.currentUser);
            await signOut(auth)

            return {
                isAuth: true,
                message: 'Usuario registrado correctamente. Verifica tu correo electrónico.',
            };
        } catch (error) {
           return {isAuth: false, message: handleFirebaseAuthError(error as FirebaseError).message};
        }
    };


    const login = async (data: Formulario): Promise<LoginResult> => {
        try {

            const {user}= await signInWithEmailAndPassword(auth, data.email, data.password);
            const token = await user.getIdToken()
            setToken(token);
            console.log("esta es la linea del login",token);
            if (!user.emailVerified){
                await signOut(auth)
                return {isAuth: false, message: "Verifica tu correo primero"};
            }
            const res =   await fetch("http://10.0.2.2:8080/user/login", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})

            });
            if (!res.ok) {
                const text = await res.text();
                console.error("Error backend:", res.status, text);
                return { isAuth: false, message: `Backend error ${res.status}` };
            }

            const userData: UsuarioInterface = await res.json();
            setUser(userData);

            return {
                isAuth: true,
                message: 'Inicio de sesión exitoso.',
                userData,

            };
        } catch (error) {
            console.log("error en login",error);
            return handleFirebaseAuthError(error as FirebaseError);

        }
    };






    const recoveryPassword = async (email: string): Promise<ErrorAuth> => {
        try {
            await sendPasswordResetEmail(auth, email);

            return {
                isAuth: true,
                message: 'Correo de recuperación enviado.',
            };
        } catch (error) {
            return handleFirebaseAuthError(error as FirebaseError);
        }
    };


    const verifiqueEmail = async (): Promise<ErrorAuth> => {
        try {
            const auth = getAuth();
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);

                return {
                    isAuth: true,
                    message: 'Correo de verificación enviado.',
                };
            }

            return {
                isAuth: false,
                message: 'No hay usuario autenticado.',
            };
        } catch (error) {
            return {isAuth: false, message: handleFirebaseAuthError(error as FirebaseError).message};
        }
    };

    const updateUserProfile = async (displayName: string, photoURL?: string): Promise<ErrorAuth> => {
        try {
            const auth = getAuth();
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName, photoURL });

                return {
                    isAuth: true,
                    message: 'Perfil actualizado correctamente.',
                };
            }

            return {
                isAuth: false,
                message: 'No hay usuario autenticado.',
            };
        } catch (error) {
            return handleFirebaseAuthError(error as FirebaseError);
        }
    };


    const logout = async (): Promise<void> => {
        const auth = getAuth();
        await auth.signOut();
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                register,
                login,
                logout,
                recoveryPassword,
                verifiqueEmail,
                updateUserProfile,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
