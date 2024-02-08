import { Request, Response } from 'express'
import studentValidationSchema from './student.validation'
import { studentService } from './student.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body
    const validationData = studentValidationSchema.parse(studentData)
    const result = await studentService.createStudentIntoDB(validationData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    })
  }
}
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentFromDB()
    res.status(200).json({
      success: true,
      message: 'Student was successfully retrieved',
      data: result,
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Student not found',
      error: error,
    })
  }
}
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await studentService.getSingleStudentFromDB(Number(id))
    res.status(200).json({
      success: true,
      message: 'Student was successfully retrieved',
      data: result,
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Student not found',
      error: error,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
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
    }else{
      res.status(200).json({
        success: false,
        message: 'Student not deleted',
      })
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Student not found',
      error: error,
    })
  }
}
export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
