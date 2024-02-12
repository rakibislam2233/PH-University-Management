import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body
    const result = await userService.createStudentIntoDB(password, studentData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createStudent,
}
