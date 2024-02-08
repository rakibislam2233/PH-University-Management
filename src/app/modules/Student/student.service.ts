import { TStudent } from './student.interface'
import { Student } from './student.model'
const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Student already exists')
  }
  const result = Student.create(studentData)
  return result
}
const getAllStudentFromDB = () => {
  const result = Student.find()
  return result
}
const getSingleStudentFromDB = async (id: number) => {
  const result = Student.findOne({ id })
  return result
}
const deleteStudentFromDB = async (id: number) => {
  const result = Student.updateOne(
    { id },
    {
      isDeleted: true,
    },
  )
  return result
}
export const studentService = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}