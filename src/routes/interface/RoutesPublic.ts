/**
 * @file RoutesPublic.ts
 * @description Define la interfaz `RoutesPublic` que contiene todas las rutas
 *              accesibles sin autenticación.
 *
 *              Cada propiedad es de tipo `Route`, importada desde "./route".
 *
 * @property {Route} login - Ruta de inicio de sesión
 * @property {Route} register - Ruta de registro de usuario
 * @property {Route} welcome - Ruta de bienvenida / landing
 */

import { Route } from "./route";

export interface RoutesPublic {
    login: Route;
    register: Route;
    welcome: Route;
}
