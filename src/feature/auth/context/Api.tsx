
import {UserProfileDTO} from "../UserState";

export const getUserProfile = async (token: string): Promise<UserProfileDTO> => {
    const response = await fetch('http://10.0.2.2:8080/user/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error al obtener perfil: ${response.status}`);
    }else{
        console.log(response.statusText);
    }

    const data: UserProfileDTO = await response.json();
    return data;
};
