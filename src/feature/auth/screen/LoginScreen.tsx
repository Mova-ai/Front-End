import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Text, Button, TextInput, useTheme, IconButton, HelperText} from 'react-native-paper';
import {useState} from "react";
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import LoginFormData from "../interface/LoginFormData";
import { useNavigation } from '@react-navigation/native';

import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import {routesPublic} from "../../../routes/routes";
import {routesPrivate} from "../../../routes/routes";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useAuth} from "../context/AuthContext";
import AuthContextType from "../interface/AuthContextType";



export default function LoginScreen() {

    const theme = useTheme();
    const { control, handleSubmit,getValues, formState: {errors}} = useForm<LoginFormData>();
    const navigation = useNavigation();
    const auth : AuthContextType = useAuth();



    const onSubmit = async (data: LoginFormData) => {
        const result = await auth.login(data);

        if (result.isAuth) {
            console.log(result.message);
            navigation.navigate(routesPrivate.home.name);
        } else {
            console.log("Error de login", result.message);
            alert(result.message);
        }
    };

    const handleRecoveryPassword = async () => {
        const email = getValues("email");

        if (!email) {
            alert("Por favor ingresa tu email primero.");
            return;
        }

        const result = await auth.recoveryPassword(email);

        if (result.isAuth) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    };



    const handleLoginWithGoogle = () => {
        console.log("Login con google")

    }


    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{flexGrow: 1, justifyContent: 'center', backgroundColor: theme.colors.background}}>

            {/*Go Button*/}
            <View style={{position:"absolute", top: 0, left: 0, zIndex: 40}}>
                <IconButton icon={"arrow-left"} size={32} onPress={() => navigation.goBack() } style={{ padding: 0, margin: 0}} />
            </View>

            {/*// Image*/}
            <View
                style={{justifyContent: 'center', alignItems: 'center', height: '20%', padding:24}}>
                <Image
                    source={
                        theme.dark
                            ? require('../../../../assets/Logo/Logo-Horizontal/Logo-White.png')
                            : require('../../../../assets/Logo/Logo-Horizontal/Logo-Black.png')
                    }
                    style={{width: '100%', height: '100%'}}
                    resizeMode='contain'
                />
            </View>

            {/*// Text*/}
            <View style={{
                    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
                }}>

                {/*//Inputs to fill*/}
                <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom:32}}>
                    <Text variant="headlineLarge" style={{textAlign: 'left', width: '100%', marginBottom: 24}}>
                        Log in
                    </Text>

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email inválido',
                            },
                        }}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Email address"
                                mode={"outlined"}
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!errors.email}
                                style={{marginBottom: 16, width: '100%'}}
                                right={
                                    value && !errors.email ? (
                                        <TextInput.Icon icon="check" color={theme.colors.success} />
                                    ) : null
                                }
                            />
                        )}
                       />
                    {errors.email && (
                        <HelperText type="error" visible={true}>
                            {errors.email.message}
                        </HelperText>
                    )}

                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener al menos 6 caracteres',
                            },
                            maxLength: {
                                value: 20,
                                message: 'La contraseña no puede superar los 20 caracteres',
                            },
                        }}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Password"
                                mode={"outlined"}
                                secureTextEntry={!showPassword}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!errors.password}
                                style={{marginBottom: 8, width: '100%'}}
                                right={
                                    <TextInput.Icon
                                        icon={showPassword ? "eye-off" : "eye"}
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                            }
                            />
                        )}
                    />
                    {errors.password && (
                        <HelperText type="error" visible={true}>
                            {errors.password.message}
                        </HelperText>
                    )}

                    <Button
                        variant="bodyMedium"
                        style={{textAlign: 'right', width: '100%', marginBottom: 24}}
                        onPress={handleRecoveryPassword}
                    >
                        Forgot password?
                    </Button>

                    <Button
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.onPrimary}
                        labelStyle={theme.fonts.headlineSmall}
                        style={{width: '100%', paddingVertical: 8}}
                    >
                        Entrar
                    </Button>
                </View>


                <View style={{alignItems:'center', gap: 16}}>
                    <Text variant={"bodyLarge"}>
                        Or login with
                    </Text>

                    <View style={{flexDirection:"row", gap: 24}}>
                        <Button
                            mode="outlined"
                            style={{height:56, margin: 0, width: 130}}
                            onPress={handleLoginWithGoogle}
                        >
                            <IconButton
                                icon={"google"}
                                size={22}
                                style={{margin:0}}
                            />
                        </Button>

                        <Button
                            mode={"outlined"}
                            style={{height:56, margin:0, width: 130}}
                            onPress={() => console.log('Facebook')}
                        >
                            <IconButton
                                icon={"facebook"}
                                size={22}
                                style={{margin:0}}
                            />
                        </Button>
                    </View>
                </View>
            </View>

            {/*Don't have an account?*/}
            <View style={{justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate(`/${routesPublic.register.name}`)}>
                    <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
                        Already have an account?
                        <Text style={{ fontWeight: '700', color: theme.colors.primary} }> Sign in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}