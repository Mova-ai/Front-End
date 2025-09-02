
import React, {useContext, useEffect, useState} from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import HomeTopBar from "./HomeTopBar";
import {useAuth} from "../../auth/context/AuthContext";
import {UserProfileDTO} from "../../auth/UserState";
import {getUserProfile} from "../../auth/context/Api";
;


const Home = () => {
    const theme = useTheme();
    // @ts-ignore
    const { token } = useAuth();
    const [profile, setProfile] = useState<UserProfileDTO | null>(null);



    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;

            try {
                const data = await getUserProfile(token);
                console.log(data);
                setProfile(data);
            } catch (error) {
                console.error('Error al obtener perfil:', error);
            }
        };

        fetchProfile();
    }, [token]);


    const handleLogout = async () => {
        try {
            await auth().signOut();
            console.log('Sesión cerrada');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (


        <View style={{ flex: 1 }}>
            <HomeTopBar />


        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.background,
                paddingHorizontal: 16,
            }}
        >
            <Text
                variant="headlineMedium"
                style={{
                    marginBottom: 24,
                    color: theme.colors.onBackground,
                    textAlign: 'center',
                }}
            >
                ¡Bienvenido a la pantalla Home,{profile?.email} !
            </Text>

            <Button
                mode="contained"
                onPress={handleLogout}
                buttonColor={theme.colors.onSurface}
                textColor={theme.colors.onPrimary}
                style={{ width: '80%', height: 56, justifyContent: 'center' }}
                labelStyle={{ fontSize: 16 }}
            >
                Cerrar sesión
            </Button>
        </View>
        </View>
    );
};

export default Home;


