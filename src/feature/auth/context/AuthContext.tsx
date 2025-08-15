import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
// @ts-ignore
import AuthContextType from "../interface/AuthContextType";
import {FirebaseAuthTypes} from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';





interface AuthContextType {

    user: FirebaseAuthTypes.User | null;
    isAuthenticated: boolean;
    register: (email: string, password: string) => Promise<void>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email: string, password: string) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('El correo ya está en uso.');
            }
            if (error.code === 'auth/invalid-email') {
                throw new Error('Correo inválido.');
            }
            if (error.code === 'auth/weak-password') {
                throw new Error('La contraseña es muy débil.');
            }
            throw new Error('Error al registrar.');
        }
    };



    return (
        <AuthContext.Provider value={{ user, isAuthenticated, register }}>
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
