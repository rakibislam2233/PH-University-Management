import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../middleware/AppError'
import { User } from '../User/user.model'
import { TStudent } from './student.interface'
const getAllStudentFromDB = () => {
  const result = Student.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemister')
  return result
}
const getSingleStudentFromDB = async (id: number) => {
  const result = Student.findOne({ id })
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemister')
  return result
}
const updateStudentIntoDB = async (id: number, payload: Partial<TStudent>) => {
  const { name, localGuardian, guardian, ...remainingStudentData } = payload
  const modifiedStudent: Record<string, unknown> = {
    ...remainingStudentData,
  }
  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedStudent[`name.${keys}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      modifiedStudent[`guardian.${keys}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [keys, value] of Object.entries(localGuardian)) {
      modifiedStudent[`localGuardian.${keys}`] = value
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedStudent, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteStudentFromDB = async (id: number) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const isUserExist = await User.findOne({ id })
    if (!isUserExist) {
      throw new AppError(400, 'User not exist in database')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedUser) {
      throw new AppError(400, 'User not deleted')
    }
    const isStudentExist = await User.findOne({ id })
    if (!isStudentExist) {
      throw new AppError(400, 'Student not exist in database')
    }
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedStudent) {
      throw new AppError(400, 'Student not deleted')
    }

    await session.commitTransaction()
    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    throw new AppError(400, `${error}`)
  } finally {
    await session.endSession()
  }
}

export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
}
