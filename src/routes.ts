import express, { Router } from "express";
import userRoutes from "./modules/user/user.route";

const router: Router = express.Router();

const routes: { path: string, route: Router }[] = [
    {
        path: "/users",
        route: userRoutes
    },

]

routes.forEach(route => router.use(route.path, route.route))

export default router;
