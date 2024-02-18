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

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const genaretedId = async (payload: TAcademicSemister) => {
  const currentId = (await findLastStudentId()) || (0).toString()
  let icrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  icrementId = `${payload.year}${payload.code}${icrementId}`
  return icrementId
}
