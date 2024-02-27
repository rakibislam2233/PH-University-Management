import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemister } from '../AcademicSemister/academicSemister.model'
import { TStudent } from '../Student/student.interface'
import { Student } from '../Student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { genaretedId } from './user.utils'
import AppError from '../../middleware/AppError'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}
  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  const admisstionSemister = await AcademicSemister.findById(
    payload.admissionSemister,
  )
  if (!admisstionSemister) {
    throw new Error('Admission semester not found')
  }
  userData.id = await genaretedId(admisstionSemister)

  //create session
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // Create user
    const newUser = await User.create([userData], { session })
    if (!newUser.length) {
      throw new AppError(404, 'Failed to create user')
    }
    payload.id = newUser[0]?.id
    payload.user = newUser[0]?._id

    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(404, 'Failed to create student')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(404, `${error}`)
  }
}

export const userService = { createStudentIntoDB }
