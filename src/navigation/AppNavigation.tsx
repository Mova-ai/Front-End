/**
 * @file AppNavigation.tsx
 * @description Componente principal de navegación de la aplicación.
 *              Decide qué conjunto de rutas mostrar según el estado de autenticación del usuario.
 *
 *              - Si el usuario **no está autenticado**, se renderizan las rutas públicas (`RoutesPublic`).
 *              - Si el usuario **está autenticado**, se renderizan las rutas privadas (`RoutesPrivate`).
 *
 * @imports
 * - useAuth: hook de contexto que proporciona el estado de autenticación.
 * - RoutesPrivate y RoutesPublic: componentes que contienen las rutas privadas y públicas.
 */

import React from 'react';
import { useAuth } from "../feature/auth/context/AuthContext";
import { RoutesPrivate, RoutesPublic } from "../routes/routes";

/**
 * Componente de navegación principal.
 *
 * @component
 * @returns {JSX.Element} Renderiza las rutas públicas o privadas según la autenticación.
 */
export default function AppNavigation() {
    const { user } = useAuth();

    return (
        <>
            {!user ? <RoutesPublic /> : <RoutesPrivate />}
        </>
    );
}
