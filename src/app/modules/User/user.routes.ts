import express, { Request, Response } from 'express'
import { userController } from './user.controller'

const router = express.Router()
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to rakib',
  })
})
router.post('/create-student', userController.createStudent)

export const userRoutes = router
