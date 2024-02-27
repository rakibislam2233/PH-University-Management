import { TAcademicDepertment } from './academicDepertment.interface'
import { AcademicDepertment } from './academicDepertment.model'

const createAcademicDepertmentIntoDB = async (payload: TAcademicDepertment) => {
  const result = await AcademicDepertment.create(payload)
  return result
}
const getAllAcademicDepertmentFromDB = async () => {
  const result = await AcademicDepertment.find().populate('academicFaculty')
  return result
}
const getSingleAcademicDepertmentFromDB = async (id: string) => {
  const result = await AcademicDepertment.findById(id).populate('academicFaculty')
  return result
}
const updateSingleAcademicDepertmentIntoDB = async (
  id: string,
  updateData: TAcademicDepertment,
) => {
  const result = await AcademicDepertment.findOneAndUpdate(
    { _id: id },
    updateData,
    { new: true },
  )
  return result
}
export const academicDepertmentService = {
  createAcademicDepertmentIntoDB,
  getAllAcademicDepertmentFromDB,
  getSingleAcademicDepertmentFromDB,
  updateSingleAcademicDepertmentIntoDB,
}
