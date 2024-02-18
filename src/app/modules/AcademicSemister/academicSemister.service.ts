import { TAcademicSemister } from './academicSemister.interface'
import { AcademicSemister } from './academicSemister.model'
import { academicSemisterNameCodeMapper } from './acedemicSemister.constant'

const createAcademicSemisterIntoDB = async (
  academicSemisterData: TAcademicSemister,
) => {
  if (
    academicSemisterNameCodeMapper[academicSemisterData.name] !==
    academicSemisterData.code
  ) {
    throw new Error(
      `Invalid academic code! example: 'Autumn' : '01' , 'Summar' : '02', 'Fall' : '03'`,
    )
  }
  const result = await AcademicSemister.create(academicSemisterData)
  return result
}
const getAllAcademicSemisterFromDB = async () => {
  const result = await AcademicSemister.find()
  return result
}
const getSingleAcademicSemisterFromDB = async (id: string) => {
  const result = await AcademicSemister.findOne({ _id: id })
  return result
}
const updateSingleAcademicSemisterIntoDB = async (
  id: string,
  updateData: TAcademicSemister,
) => {
  if (academicSemisterNameCodeMapper[updateData.name] !== updateData.code) {
    throw new Error(
      `Invalid academic code! example: 'Autumn' : '01' , 'Summer' : '02', 'Fall' : '03'`,
    )
  }
  const result = await AcademicSemister.findOneAndUpdate(
    { _id: id },
    updateData,
    { new: true },
  )
  //   const result = await AcademicSemister.updateOne(
  //     { _id: id },
  //     {
  //       $set: updateData,
  //     },
  //   )
  return result
}
export const academicSemisterService = {
  createAcademicSemisterIntoDB,
  getAllAcademicSemisterFromDB,
  getSingleAcademicSemisterFromDB,
  updateSingleAcademicSemisterIntoDB,
}
