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


export const AuthProvider = ({ children } : { children: ReactNode } ) => {
    const auth = getAuth();
    const [ user, setUser ] = useState<UsuarioInterface | null>(null);

    /*
    const register = async (data : Formulario) => {

    }

    const Login = ( ) => {

    };

    const LoginWithGoogle = () => {

    }

    const RecoveryPassword = () => {

    }

    const VerifiqueEmail = () => {

    }

    const UpdateProfile = () => {

    }

    const Logout = () => {

    };
    */

    return (
        <AuthContext.Provider value={{ user }}>

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
