import config from '../../config'
import { AcademicSemister } from '../AcademicSemister/academicSemister.model'
import { TStudent } from '../Student/student.interface'
import { Student } from '../Student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { genaretedId } from './user.utils'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  const admisstionSemister = await AcademicSemister.findById(
    studentData.admissionSemister,
  )
  if (!admisstionSemister) {
    throw new Error('Admission semester not found')
  }

  userData.id = await genaretedId(admisstionSemister)
  // Create user
  const newUser = await User.create(userData)

  if (Object.keys(newUser).length) {
    // Set student data
    studentData.id = newUser.id
    studentData.user = newUser._id

    // Create student
    const result = await Student.create(studentData)
    return result
  }
}

export const userService = { createStudentIntoDB }
