import { NextFunction, Request, Response } from 'express'
import { studentService } from './student.service'
const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getAllStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student was successfully retrieved',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await studentService.getSingleStudentFromDB(Number(id))
    res.status(200).json({
      success: true,
      message: 'Student was successfully retrieved',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await studentService.deleteStudentFromDB(Number(id))
    if (result.modifiedCount > 0) {
      const deleteUser = await studentService.getSingleStudentFromDB(Number(id))
      res.status(200).json({
        success: true,
        message: 'Student deleted successfully',
        data: deleteUser,
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'Student not deleted',
      })
    }
  } catch (error) {
    next(error)
  }
}
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
