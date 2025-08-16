/**
 * @file route.ts
 * @description Define la interfaz base `Route` que representa una ruta
 *              dentro de la aplicación React o React Native.
 *
 * @property {string} name - Nombre único de la ruta, usado en el Stack Navigator.
 * @property {ComponentType<any>} component - Componente React que se renderiza al acceder a la ruta.
 */

import { ComponentType } from "react";

export interface Route {
    name: string;
    component: ComponentType<any>;
}