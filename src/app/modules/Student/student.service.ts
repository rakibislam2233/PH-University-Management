import { Student } from './student.model'
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
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
