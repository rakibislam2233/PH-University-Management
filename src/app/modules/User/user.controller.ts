import catchAsync from '../../utils/catchAsync'
import { userService } from './user.service'
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  const result = await userService.createStudentIntoDB(password, studentData)
  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const userController = {
  createStudent,
}
