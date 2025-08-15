import {Route} from "./route";

interface RoutesPublic {
    public : {
        login : Route;
        register : Route;
    }

    private : {
        home: Route;
        users: Route;
        locals: Route;
        book: Route;
        reviews: Route;
        gamificacion: Route;
        search: Route;
    }
}