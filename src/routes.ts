import express, { Router } from "express";
import academicSemesterRoutes from "./modules/academicSemester/academicSemester.route";
import userRoutes from "./modules/user/user.route";

const router: Router = express.Router();

const routes: { path: string; route: Router }[] = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/academic-semester",
    route: academicSemesterRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
