import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Text, Button, TextInput, useTheme, IconButton} from 'react-native-paper';
import {useState} from "react";
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import LoginFormData from "../interface/LoginFormData";
import { useNavigation } from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@react-native-firebase/auth';


export default function LoginScreen() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const theme = useTheme();
    const { control, handleSubmit, formState: {errors}} = useForm<LoginFormData>();
    const navigation = useNavigation();

    const onSubmit = (data: LoginFormData) => {

        console.log("login: ", data);
        const {email, password} = data;

    signInWithEmailAndPassword(getAuth(),email,password)
        .then((user) => {
            console.log("login adentro despues del login: ", user);
        })
        .catch((error) => {
            console.log(error);
        })

    }



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
                                    errors.email
                                        ? <TextInput.Icon icon={"check"} color={theme.colors.success}/>
                                        : null
                                }
                            />
                        )}
                       />

                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'La contraseña es obligatoria'}}
                        render={({ field: {onChange, onBlur, value}}) => (
                            <TextInput
                                label="Password"
                                mode={"outlined"}
                                secureTextEntry
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={!!errors.password}
                                style={{marginBottom: 8, width: '100%'}}
                                right={<TextInput.Icon icon={"eye"}/>}
                            />
                        )}
                    />
                    {errors.password && <Text style={{ color: theme.colors.error }}>{errors.password.message}</Text>}


                    <Text
                        variant="bodyMedium"
                        style={{textAlign: 'right', width: '100%', marginBottom: 24}}
                    >
                        Forgot password?
                    </Text>

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

                {/*Or login with*/}
                <View style={{alignItems:'center', gap: 16}}>
                    <Text variant={"bodyLarge"}>
                        Or login with
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
                    <Text variant="bodyLarge" style={{ color: theme.colors.onSurface }}>
                        Already have an account?
                        <Text style={{ fontWeight: '700', color: theme.colors.primary} }> Log in</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}