import {Alert, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {Button, HelperText, IconButton, Text, TextInput, useTheme} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {createUserWithEmailAndPassword, getAuth} from "@react-native-firebase/auth";
import {useAuth} from "../context/AuthContext";
import {routesPublic} from "../../../routes/routes";
import LoginFormData from "../interface/LoginFormData";
import {useState} from "react";

type RegisterFormData = {
    email: string;
    password: string;
};




const RegisterScreen = () => {

    const theme = useTheme();
    const { control, handleSubmit, formState: {errors}} = useForm<RegisterFormData>();
    const navigation = useNavigation();
    const auth = useAuth();


        const onSubmit = async (data: RegisterFormData) => {
            console.log("Registro datos:", data);
            try {

                const response = await auth.register(data);

                if (response.isAuth) {
                    Alert.alert("Registro exitoso", response.message);
                    navigation.navigate(routesPublic.login.name);
                } else {
                    Alert.alert("Error en registro", response.message);
                }
            } catch (error) {
                Alert.alert("Error inesperado", "Por favor intenta más tarde.");
            }
        };


    const [showPassword, setShowPassword] = useState(false);
    return (
        <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center', backgroundColor: theme.colors.background}}>

            {/*Go Button*/}
            <View style={{position:"absolute", top: 0, left: 0, zIndex: 40}}>
                <IconButton icon={"arrow-left"} size={32} onPress={() => navigation.goBack() } style={{ padding: 0, margin: 0}} />
            </View>

            {/*// Image*/}
            <View style={{justifyContent: 'center', alignItems: 'center', height: '20%', marginBottom: 32}}>
                <Image
                    source={
                        theme.dark
                            ? require('../../../../assets/Logo/Logo-Horizontal/Logo-White.png')
                            : require('../../../../assets/Logo/Logo-Horizontal/Logo-Black.png')
                    }
                    style={{width: '80%', height: '100%'}}
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
                        Create Account
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
                                label="Email"
                                mode={"outlined"}
                                keyboardType="email-address"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!errors.email}
                                style={{marginBottom: 16, width: '100%'}}
                                theme={{
                                    colors: {
                                        onSurface: theme.colors.onPrimary,
                                        placeholder: theme.colors.primary,
                                        primary: theme.colors.primary,
                                    },
                                }}
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
                        rules={{

                            required: 'El name es obligatorio',
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
                                keyboardType="default"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!errors.password}
                                style={{marginBottom: 16, width: '100%'}}
                                theme={{
                                    colors: {
                                        onSurface: theme.colors.onPrimary,
                                        placeholder: theme.colors.primary,
                                        primary: theme.colors.primary,
                                    },
                                }}
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
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        buttonColor={theme.colors.primary}
                        textColor={theme.colors.onPrimary}
                        style={{width: '100%', paddingVertical: 8}}
                    >
                        Entry - Welcome
                    </Button>
                </View>

                {/*Or login with*/}
                <View style={{alignItems:'center', gap: 16}}>
                    <Text variant={"bodyMedium"}>
                        Or create account with
                    </Text>

                    <View style={{flexDirection:"row", gap: 24}}>
                        <Button
                            mode="outlined"
                            style={{height:56, margin: 0, width: 130}}
                            onPress={() => console.log('Google')}
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
                <TouchableOpacity onPress={() => navigation.navigate(`${routesPublic.login.name}`)}>
                    <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                        Already have an account?
                        <Text style={{ fontWeight: '700', color: theme.colors.primary} }> Log in</Text>
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

    )
}

export default RegisterScreen;