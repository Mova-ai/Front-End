import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
// @ts-ignore
import AuthContextType from "../interface/AuthContextType";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail, sendEmailVerification, updateProfile
} from '@react-native-firebase/auth';
import {handleFirebaseAuthError} from "./FirebaseError";
import LoginFormData from "../interface/LoginFormData";
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = getAuth();
    const [user, setUser] = useState<UsuarioInterface | null>(null);
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
            await sendEmailVerification(userCredential.user);

            return {
                isAuth: true,
                message: 'Usuario registrado correctamente. Verifica tu correo electrónico.',
            };
        } catch (error) {
           return {isAuth: false, message: handleFirebaseAuthError(error as FirebaseError).message};
        }
    };


    const login = async (data: Formulario): Promise<ErrorAuth> => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);

            return {
                isAuth: true,
                message: 'Inicio de sesión exitoso.',
            };
        } catch (error) {
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
