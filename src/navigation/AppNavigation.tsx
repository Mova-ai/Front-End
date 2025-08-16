import React, {ReactNode} from 'react';
import {useAuth} from "../feature/auth/context/AuthContext";

import {RoutesPrivate, RoutesPublic} from "../routes/routes";


export default function AppNavigation() {
    const {isAuthenticated} = useAuth();

    return (
        <>
                {!isAuthenticated ? <RoutesPublic/> : <RoutesPrivate/> }
        </>
    )
}

