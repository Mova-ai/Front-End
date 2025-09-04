/**
 * @file routes.ts
 * @description Definición y configuración de las rutas públicas y privadas
 *              para la aplicación React Native utilizando React Navigation.
 *
 *              Las interfaces utilizadas:
 *              - RoutesPublic: importada desde "./interface/RoutesPublic"
 *              - RoutesPrivate: importada desde "./interface/RoutesPrivate"
 *
 *              RoutesPublic: rutas accesibles sin autenticación.
 *              RoutesPrivate: rutas que requieren que el usuario esté autenticado.
 *
 *
 * @guide Cómo crear una nueva ruta en la aplicación:
 *
 * 1. Crear el componente de la pantalla que se desea agregar:
 *    - Ubícalo en la carpeta correspondiente, por ejemplo:
 *      "../feature/<modulo>/screen/NuevaPantalla.tsx"
 *
 * 2. Importar el componente en `routes.ts`:
 *    import NuevaPantalla from "../feature/<modulo>/screen/NuevaPantalla";
 *
 * 3. Decidir si la ruta será pública o privada:
 *
 *      - Pública: agregarla dentro del objeto `routesPublic` y asegurarse
 *          de que exista en la interfaz `RoutesPublic`.
 *
 *      - Privada: agregarla dentro del objeto `routesPrivate` y asegurarse
 *          de que exista en la interfaz `RoutesPrivate`.
 *
 * 4. Agregar la ruta al objeto correspondiente:
 *
 *          const routesPublic: Rpublic = {
 *               welcome: {name: 'Welcome', component: AuthEntry},
 *               login: {name: 'Login', component: LoginScreen},
 *               register: {name: 'Register', component: RegisterScreen},
 *               {nombre}: name: '{nombre}'. componente: '{NuevaPantalla}'
 *           };
 *
 *
 *
 * 5. Asegurarse de actualizar la interfaz correspondiente (si no existe):
 *    - Para rutas públicas: ./interface/RoutesPublic.ts
 *    - Para rutas privadas: ./interface/RoutesPrivate.ts
 *
 * 6. Guardar y la nueva ruta estará disponible automáticamente en
 *    `RoutesPublic` o `RoutesPrivate` cuando se renderice la navegación.
 *
 */

import LoginScreen from "../feature/auth/screen/LoginScreen";
import RegisterScreen from "../feature/auth/screen/RegisterScreen";
import Home from "../feature/home/screen/Home";
import {RoutesPublic as Rpublic} from "./interface/RoutesPublic";
import {RoutesPrivate as Rprivate} from "./interface/RoutesPrivate";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthEntry from "../feature/home/screen/AuthEntry";
import ProfileUser from "../feature/home/screen/ProfileUser";
import EditProfile from "../feature/home/screen/EditProfile";

/**
 * Rutas públicas de la aplicación
 * @type {Rpublic}
 * @property {object} welcome - Pantalla de bienvenida (AuthEntry)
 * @property {object} login - Pantalla de login
 * @property {object} register - Pantalla de registro
 */
export const routesPublic: Rpublic = {
    welcome: {name: 'Welcome', component: AuthEntry},
    login: {name: 'Login', component: LoginScreen},
    register: {name: 'Register', component: RegisterScreen}
};

/**
 * Rutas privadas de la aplicación
 * @type {Rprivate}
 * @property {object} home - Pantalla principal del usuario autenticado
 * @note Se pueden agregar más rutas privadas aquí, por ejemplo: users, locals, book, reviews, gamification, search
 */
export const routesPrivate: Rprivate = {
    home: {name: 'Home', component: Home},
    profile: {name: 'Profile', component: ProfileUser},
    editProfile: {name: 'EditProfile', component: EditProfile}
    // users: Route;
    // locals: Route;
    // book: Route;
    // reviews: Route;
    // gamificacion: Route;
    // search: Route;
}

/**
 * Componente que renderiza las rutas públicas
 * @returns {JSX.Element} Stack.Navigator con todas las rutas públicas
 */
export const RoutesPublic = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {Object.values(routesPublic).map((element) => (
                <Stack.Screen
                    name={element.name}
                    component={element.component}
                    key={element.name}
                />
            ))}
        </Stack.Navigator>
    )
}

/**
 * Componente que renderiza las rutas privadas
 * @returns {JSX.Element} Stack.Navigator con todas las rutas privadas
 */
export const RoutesPrivate = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {Object.values(routesPrivate).map((element) => (
                <Stack.Screen
                    name={element.name}
                    component={element.component}
                    key={element.name}
                />
            ))}
        </Stack.Navigator>
    )
}
