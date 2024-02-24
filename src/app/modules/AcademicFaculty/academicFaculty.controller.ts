import catchAsync from '../../utils/catchAsync'
import { academicFacultyService } from './academicFaculty.service'
const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  )
  res.status(200).json({
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  })
})
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllAcademicFacultyFromDB()
  res.status(200).json({
    success: true,
    message: 'All academic faculty retrieved successfully',
    data: result,
  })
})
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await academicFacultyService.getSingleAcademicFacultyFromDB(id)
  res.status(200).json({
    success: true,
    message: 'Single academic faculty retrieved successfully',
    data: result,
  })
})
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await academicFacultyService.updateSingleAcademicFacultyIntoDB(
    id,
    req.body,
  )
  res.status(200).json({
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  })
})
export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
}
