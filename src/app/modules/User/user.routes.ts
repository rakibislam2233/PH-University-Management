import express, { Request, Response } from 'express'
import { userController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { createStudentValidationSchema } from '../Student/student.validation'

const router = express.Router()
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to rakib',
  })
})
router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
)

export const userRoutes = router
