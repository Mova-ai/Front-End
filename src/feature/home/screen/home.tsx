import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Home = () => {
    const theme = useTheme();

    const handleLogout = async () => {
        try {
            await auth().signOut();
            console.log('Sesión cerrada');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
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
                ¡Bienvenido a la pantalla Home!
            </Text>

            <Button
                mode="contained"
                onPress={handleLogout}
                buttonColor={theme.colors.error}
                textColor={theme.colors.onPrimary}
                style={{ width: '80%', height: 56, justifyContent: 'center' }}
                labelStyle={{ fontSize: 16 }}
            >
                Cerrar sesión
            </Button>
        </View>
    );
};

export default Home;

