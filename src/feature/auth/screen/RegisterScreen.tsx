import {Alert, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {Button, IconButton, Text, TextInput, useTheme} from "react-native-paper";
import {Controller, useForm} from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {createUserWithEmailAndPassword, getAuth} from "@react-native-firebase/auth";


type RegisterFormData = {
    email: string;
    password: string;
};


const RegisterScreen = () => {


    const theme = useTheme();
    const { control, handleSubmit, formState: {errors}} = useForm<any>();
    const navigation = useNavigation();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), data.email, data.password);
            console.log('Usuario registrado:', userCredential.user);
            Alert.alert('Registro exitoso', 'Tu cuenta fue creada correctamente.');
        } catch (error: any) {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'El correo ya está en uso.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'Correo inválido.');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Error', 'La contraseña es muy débil (mínimo 6 caracteres).');
            } else {
                Alert.alert('Error', 'No se pudo registrar el usuario.');
            }
        }
    }

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
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    label="Email"
                                    mode="outlined"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.email}
                                    style={{ marginBottom: 8 }}
                                    right={
                                        errors.email ? (
                                            <TextInput.Icon icon="close-circle" color="red" />
                                        ) : value && !errors.email ? (
                                            <TextInput.Icon icon="check-circle" color="green" />
                                        ) : null
                                    }

                                />
                                {errors.email?.message && (
                                    <Text style={{ color: 'red', alignSelf: 'flex-start', marginBottom: 8 }}>
                                        {errors.email.message.toString()}
                                    </Text>
                                )}

                            </View>
                        )}
                    />


                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'La contraseña es obligatoria',
                            minLength: {
                                value: 6,
                                message: 'Mínimo 6 caracteres',
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    label="Contraseña"
                                    mode="outlined"
                                    secureTextEntry
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    error={!!errors.password}
                                    style={{ marginBottom: 8 }}
                                    right={
                                        errors.password ? (
                                            <TextInput.Icon icon="close-circle" color="red" />
                                        ) : value && value.length >= 6 ? (
                                            <TextInput.Icon icon="check-circle" color="green" />
                                        ) : null
                                    }
                                />
                                {errors.password?.message && (
                                    <Text style={{ color: 'red', alignSelf: 'flex-start', marginBottom: 8 }}>
                                        {errors.password.message.toString()}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                    {/*<Controller*/}
                    {/*    control={control}*/}
                    {/*    name="email"*/}
                    {/*    rules={{*/}
                    {/*        required: 'El email es obligatorio',*/}
                    {/*        pattern: {*/}
                    {/*            value: /\S+@\S+\.\S+/,*/}
                    {/*            message: 'Email inválido',*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*    render={({ field: {onChange, onBlur, value}}) => (*/}
                    {/*        <TextInput*/}
                    {/*            label="Email address"*/}
                    {/*            mode={"outlined"}*/}
                    {/*            keyboardType="email-address"*/}
                    {/*            onBlur={onBlur}*/}
                    {/*            onChangeText={onChange}*/}
                    {/*            value={value}*/}
                    {/*            error={!!errors.email}*/}
                    {/*            style={{marginBottom: 16, width: '100%'}}*/}
                    {/*            right={*/}
                    {/*                errors.email*/}
                    {/*                    ? <TextInput.Icon icon={"check"} color={theme.colors.success}/>*/}
                    {/*                    : null*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}

                    {/*<Controller*/}
                    {/*    control={control}*/}
                    {/*    name="email"*/}
                    {/*    rules={{*/}
                    {/*        required: 'El email es obligatorio',*/}
                    {/*        pattern: {*/}
                    {/*            value: /\S+@\S+\.\S+/,*/}
                    {/*            message: 'Email inválido',*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*    render={({ field: {onChange, onBlur, value}}) => (*/}
                    {/*        <TextInput*/}
                    {/*            label="Email address"*/}
                    {/*            mode={"outlined"}*/}
                    {/*            keyboardType="email-address"*/}
                    {/*            onBlur={onBlur}*/}
                    {/*            onChangeText={onChange}*/}
                    {/*            value={value}*/}
                    {/*            error={!!errors.email}*/}
                    {/*            style={{marginBottom: 16, width: '100%'}}*/}
                    {/*            right={*/}
                    {/*                errors.email*/}
                    {/*                    ? <TextInput.Icon icon={"check"} color={theme.colors.success}/>*/}
                    {/*                    : null*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}

                    {/*<Controller*/}
                    {/*    control={control}*/}
                    {/*    name="email"*/}
                    {/*    rules={{*/}
                    {/*        required: 'El email es obligatorio',*/}
                    {/*        pattern: {*/}
                    {/*            value: /\S+@\S+\.\S+/,*/}
                    {/*            message: 'Email inválido',*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*    render={({ field: {onChange, onBlur, value}}) => (*/}
                    {/*        <TextInput*/}
                    {/*            label="Email address"*/}
                    {/*            mode={"outlined"}*/}
                    {/*            keyboardType="email-address"*/}
                    {/*            onBlur={onBlur}*/}
                    {/*            onChangeText={onChange}*/}
                    {/*            value={value}*/}
                    {/*            error={!!errors.email}*/}
                    {/*            style={{marginBottom: 16, width: '100%'}}*/}
                    {/*            right={*/}
                    {/*                errors.email*/}
                    {/*                    ? <TextInput.Icon icon={"check"} color={theme.colors.success}/>*/}
                    {/*                    : null*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}

                    {/*<Controller*/}
                    {/*    control={control}*/}
                    {/*    name="password"*/}
                    {/*    rules={{ required: 'La contraseña es obligatoria'}}*/}
                    {/*    render={({ field: {onChange, onBlur, value}}) => (*/}
                    {/*        <TextInput*/}
                    {/*            label="Password"*/}
                    {/*            mode={"outlined"}*/}
                    {/*            secureTextEntry*/}
                    {/*            onBlur={onBlur}*/}
                    {/*            onChangeText={onChange}*/}
                    {/*            value={value}*/}
                    {/*            error={!!errors.password}*/}
                    {/*            style={{marginBottom: 36, width: '100%'}}*/}
                    {/*            right={<TextInput.Icon icon={"eye"}/>}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}
                    {/*{errors.password && <Text style={{ color: theme.colors.error }}>{errors.password.message}</Text>}*/}


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
                <TouchableOpacity onPress={() => console.log('Login')}>
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