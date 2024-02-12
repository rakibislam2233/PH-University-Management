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
]
moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
