import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Button, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from "react-native-safe-area-context";
import {routesPublic} from "../../../routes/routes";

type AuthStackParamList = {
    AuthEntry: undefined;
    Login: undefined;
    Register: undefined;
}

const AuthEntry: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    return (
            <View style={[styles.container, {backgroundColor: theme.colors.background} ]}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image
                        source={
                            theme.dark
                                ? require('../../../../assets/Logo/Logo-Vertical/Logo-White.png')
                                : require('../../../../assets/Logo/Logo-Vertical/Logo-Black.png')
                        }
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.contentContainer}>
                    <View>
                        <Text
                            variant="displayMedium"
                            style={[styles.title, {color: theme.colors.onBackground}]}
                        >
                            Explore the app
                        </Text>
                        <Text
                            variant="headlineSmall"
                            style={[styles.subtitle, {color: theme.colors.onSurfaceVariant}]}
                        >
                            Now your finances are in one place and always under control
                        </Text>
                    </View>

                    <View>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate(`${routesPublic.login.name}`)}
                            style={styles.button}
                            labelStyle={theme.fonts.headlineSmall}
                            buttonColor={theme.colors.onSurface}
                            textColor={theme.colors.surface}
                        >
                            Sign In
                        </Button>

                        <Button
                            mode="outlined"
                            labelStyle={theme.fonts.headlineSmall}
                            onPress={() => navigation.navigate(`${routesPublic.register.name}`)}
                            style={[styles.button, {borderColor: theme.colors.onSurface}]}
                            textColor={theme.colors.onSurface}
                        >
                            Create Account
                        </Button>
                    </View>
                </View>
            </View>
    );
};

export default AuthEntry;


const styles = StyleSheet.create({
    container: {
        flex: 1, // Se asume que PaperProvider define esto global
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: '80%',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        // paddingHorizontal: 32,
        // paddingBottom: 32,
    },
    title: {
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
    },
    button: {
        marginVertical: 8,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
});