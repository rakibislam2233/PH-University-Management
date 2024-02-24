import { TAcademicSemister } from '../AcademicSemister/academicSemister.interface'
import { User } from './user.model'

export const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id : undefined
}
//2030010000
export const genaretedId = async (payload: TAcademicSemister) => {
  let currentId: string | undefined = (0).toString() //by default 0000
  const lastStudentId = await findLastStudentId()
  const lastStudentSemisterYear = lastStudentId?.substring(0, 4)
  const lastStudentSemisterCode = lastStudentId?.substring(4, 6)
  const currentStudentSemisterYear = payload.year
  const currentStudentSemisterCode = payload.code
  if (
    lastStudentSemisterYear &&
    lastStudentSemisterCode === currentStudentSemisterYear &&
    currentStudentSemisterCode
  ) {
    currentId = lastStudentId?.substring(6)
  }
  let icrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  icrementId = `${payload.year}${payload.code}${icrementId}`
  return icrementId
}
