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

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const { student } = req.body;
  const result = await studentService.updateStudentIntoDB(Number(id), student)
  res.status(200).json({
    success: true,
    message: 'Student was successfully updated',
    data: result,
  })
})
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  await studentService.deleteStudentFromDB(Number(id))
  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
  })
})
export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
