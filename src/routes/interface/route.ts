import {ComponentType} from "react";

export interface Route {
    name: string;
    component: ComponentType<any>;
}