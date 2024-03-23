import { academicSemisterRoutes } from './../modules/AcademicSemister/academicSemister.routes'
import { Router } from 'express'
import { userRoutes } from '../modules/User/user.routes'
import { studentRoutes } from '../modules/Student/student.routes'
import { academicFacultyRoutes } from '../modules/AcademicFaculty/academicFaculty.routes'
import { academicDepertmentRoutes } from '../modules/AcademicDepertment/academicDepertment.routes'
import { FacultyRoutes } from '../modules/Faculty/faculty.route'
import { AdminRoutes } from '../modules/Admin/admin.route'

const router = Router()
const moduleRoutes = [
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/students',
    routes: studentRoutes,
  },
  {
    path: '/faculties',
    routes: FacultyRoutes,
  },
  {
    path: '/admins',
    routes: AdminRoutes,
  },
  {
    path: '/academicSemister',
    routes: academicSemisterRoutes,
  },
  {
    path: '/academicFaculty',
    routes: academicFacultyRoutes,
  },
  {
    path: '/academicDepertment',
    routes: academicDepertmentRoutes,
  },
]
moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
