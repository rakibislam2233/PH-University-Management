import { academicSemisterRoutes } from './../modules/AcademicSemister/academicSemister.routes';
import { Router } from 'express'
import { userRoutes } from '../modules/User/user.routes'
import { studentRoutes } from '../modules/Student/student.routes'

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
    path:'/academic',
    routes: academicSemisterRoutes
  }
]
moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
