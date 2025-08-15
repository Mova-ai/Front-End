import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import LoginScreen from '../feature/auth/screen/LoginScreen';
import RegisterScreen  from '../feature/auth/screen/RegisterScreen';
import Home from '../feature/home/screen/home';

import { useAuth} from "../feature/auth/context/AuthContext";
import AuthEntry from "../feature/home/screen/AuthEntry";
import { View } from 'react-native';
import {IconButton, Text, useTheme} from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const { isAuthenticated } = useAuth();
    const theme = useTheme()
    const AuthStack = createNativeStackNavigator();
    const AppStack = createNativeStackNavigator();

    return (
        <NavigationContainer>
                {isAuthenticated ? (
                    <AppStack.Navigator screenOptions={{ headerShown: false }}>
                        <AppStack.Screen name={"Home"} component={Home} />
                    </AppStack.Navigator>
                )
                    : (
                        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                            <AuthStack.Screen name={"AuthEntry"} component={AuthEntry} />
                            <AuthStack.Screen name={"Login"} component={LoginScreen} />
                            <AuthStack.Screen name={"Register"} component={RegisterScreen} />

                        </AuthStack.Navigator>
                    )

                }
        </NavigationContainer>
    )
}