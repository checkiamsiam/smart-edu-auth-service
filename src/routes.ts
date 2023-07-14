import express, { Router } from "express";
import academicDepartmentRoutes from "./modules/academicDepartment/academicDepartment.route";
import academicFacultyRoutes from "./modules/academicFaculty/academicFaculty.route";
import academicSemesterRoutes from "./modules/academicSemester/academicSemester.route";
import adminRoute from "./modules/admin/admin.route";
import authRoutes from "./modules/auth/auth.route";
import facultyRoute from "./modules/faculty/faculty.route";
import managementDepartmentRoutes from "./modules/managementDepartment/managementDepartment.route";
import studentRoute from "./modules/student/student.route";
import userRoutes from "./modules/user/user.route";

const router: Router = express.Router();

const routes: { path: string; route: Router }[] = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/student",
    route: studentRoute,
  },
  {
    path: "/faculty",
    route: facultyRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/academic-semester",
    route: academicSemesterRoutes,
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: academicDepartmentRoutes,
  },
  {
    path: "/management-department",
    route: managementDepartmentRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
