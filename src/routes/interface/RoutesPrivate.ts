/**
 * @file RoutesPrivate.ts
 * @description Define la interfaz `RoutesPrivate` que contiene todas las rutas
 *              que requieren que el usuario esté autenticado.
 *
 *              Cada propiedad es de tipo `Route`, importada desde "./route".
 *
 * @note Se pueden agregar más rutas privadas según la necesidad:
 *       users, locals, book, reviews, gamificacion, search, etc.
 */

import { Route } from "./route";

export interface RoutesPrivate {
    home: Route;
    profile: Route;
    editProfile: Route;
    // users: Route;
    // locals: Route;
    // book: Route;
    // reviews: Route;
    // gamificacion: Route;
    // search: Route;
}