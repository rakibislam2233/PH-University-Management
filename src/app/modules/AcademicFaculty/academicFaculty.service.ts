import { TAcademicFaculty } from './academicFaculty'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find()
  return result
}
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}
const updateSingleAcademicFacultyIntoDB = async (
  id: string,
  updateData: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    updateData,
    { new: true },
  )
  return result
}
export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyIntoDB,
}
