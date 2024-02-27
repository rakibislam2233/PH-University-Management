import AppError from '../../middleware/AppError'
import catchAsync from '../../utils/catchAsync'
import { AcademicSemister } from './academicSemister.model'
import { academicSemisterService } from './academicSemister.service'
const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemisterService.createAcademicSemisterIntoDB(
    req.body,
  )
  res.status(200).json({
    success: true,
    message: 'Academic semister created successfully',
    data: result,
  })
})
const getAllAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemisterService.getAllAcademicSemisterFromDB()
  res.status(200).json({
    success: true,
    message: 'All academic semister retrieved successfully',
    data: result,
  })
})
const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await academicSemisterService.getSingleAcademicSemisterFromDB(id)
  res.status(200).json({
    success: true,
    message: 'Single academic semister retrieved successfully',
    data: result,
  })
})
const updateSingleAcademicSemister = catchAsync(async (req, res) => {
  const { id } = req.params
  const isSemisterExist = await AcademicSemister.findById(id);
  if (!isSemisterExist) {
    throw new AppError(404, 'Academic semister not exist')
  }
  const result =
    await academicSemisterService.updateSingleAcademicSemisterIntoDB(
      id,
      req.body,
    )
  res.status(200).json({
    success: true,
    message: 'Academic semister updated successfully',
    data: result,
  })
})
export const academicSemisterController = {
  createAcademicSemister,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateSingleAcademicSemister,
}
