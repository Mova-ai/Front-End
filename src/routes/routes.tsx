import LoginScreen from "../feature/auth/screen/LoginScreen";
import RegisterScreen from "../feature/auth/screen/RegisterScreen";
import Home from "../feature/home/screen/Home";
import {RoutesPublic as Rpublic} from "./interface/RoutesPublic";
import {RoutesPrivate as Rprivate} from "./interface/RoutesPrivate";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthEntry from "../feature/home/screen/AuthEntry";


const routesPublic: Rpublic = {
    welcome: {name: 'Welcome', component: AuthEntry},
    login: {name: 'Login', component: LoginScreen},
    register: {name: 'Register', component: RegisterScreen}
};

const routesPrivate: Rprivate = {
    home: {name: 'Home', component: Home},
    // users: Route;
    // locals: Route;
    // book: Route;
    // reviews: Route;
    // gamificacion: Route;
    // search: Route;
}

export const RoutesPublic = () => {
    const Stack = createNativeStackNavigator();

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {Object.values(routesPublic).map((element) => (
                    <Stack.Screen name={element.name} component={element.component} key={element.name}/>
                ))}
            </Stack.Navigator>
        </>
    )
}

export const RoutesPrivate = () => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {Object.values(routesPrivate).map((element) => (
                    <Stack.Screen name={element.name} component={element.component} key={element.name}/>
                ))}
            </Stack.Navigator>
        </>
    )
}

