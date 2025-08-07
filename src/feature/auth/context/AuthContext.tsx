import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {onAuthStateChanged,signOut,signInWithEmailAndPassword,User} from "firebase/auth";
import { auth } from "../../../firebase/firebase";

type AuthContextType = {
    user:User | null;
    isAuthenticated: boolean;
    login: (email:string,password:string) => Promise<void>;
    logout: () => Promise<void>;
};



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode } ) => {
    const [user,setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
