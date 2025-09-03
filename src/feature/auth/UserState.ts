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
    isAuth: boolean;
}


export interface UserProfileDTO {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    avatarUrl: string | null;
    birthday: string | null;
    bio: string | null;
}
