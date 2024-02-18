import catchAsync from '../../utils/catchAsync'
import { studentService } from './student.service'

const getAllStudent = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentFromDB()
  res.status(200).json({
    success: true,
    message: 'Student was successfully retrieved',
    data: result,
  })
})
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await studentService.getSingleStudentFromDB(Number(id))
  res.status(200).json({
    success: true,
    message: 'Student was successfully retrieved',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
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
})
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
