import config from '../../config'
import { TStudent } from '../Student/student.interface'
import { Student } from '../Student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {}
  //if password is not given , use default password
  userData.password = password || (config.default_password as string)
  //set student role
  userData.role = 'student'
  //set manualy genareted id
  userData.id = '203010001'
  const newUser = await User.create(userData)
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id
    const result = await Student.create(studentData)
    return result
  }
}

export const userService = { createStudentIntoDB }
