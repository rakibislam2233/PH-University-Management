import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../middleware/AppError'
import { User } from '../User/user.model'
import { TStudent } from './student.interface'
import QueryBuilder from '../../../builder/QueryBuilder'
import { studentSearchableFields } from './student.constaint'
// const getAllStudentFromDB = async (query: Record<string, unknown>) => {
//   // search query
//   let searchTerm = ''
//   const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as unknown as string
//   }
//   const searchQuery = Student.find({
//     $or: studentSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   })
//   //filter query
//   const queryObj = { ...query }
//   // search,filter,sort,pagination,limit,fields limiting
//   const removeSearchTerm = ['searchTerm', 'sort', 'page', 'limit', 'fields']
//   removeSearchTerm.forEach((term) => delete queryObj[term])
//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     })
//     .populate('admissionSemister')

//   //sort query
//   let sort = 'createdAt'
//   if (query?.sort) {
//     sort = query?.sort as string
//   }
//   const sortQuery = filterQuery.sort(sort)
//   //pagination query
//   let page = 1
//   let limit = 20
//   let skip = 0
//   if (query?.limit) {
//     limit = Number(query?.limit)
//   }
//   if (query?.page) {
//     page = Number(query?.page)
//     skip = (page - 1) * limit
//   }
//   const paginationQuery = sortQuery.skip(skip)
//   //limit query
//   const limitQuery = paginationQuery.limit(limit)
//   //fields limiting
//   let fields = '__v'
//   if (query?.fields) {
//     fields = (query?.fields as string).split(',').join(' ')
//   }
//   const fieldsLimitingQuery = await limitQuery.select(fields)
//   return fieldsLimitingQuery
// }
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemister')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
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
