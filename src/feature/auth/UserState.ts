export interface UserState {
    uid: string | null;
    isAuth: boolean;
    profile: {
        name?: string;
        email: string;
        avatarUrl?: string;
        phone?: string;
    };
    roles: string[]; // ej: ["USER", "ADMIN"]
    favorites: {
        locales?: string[];
        planes?: string[];
    };
}

export interface UsuarioInterface {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
}
