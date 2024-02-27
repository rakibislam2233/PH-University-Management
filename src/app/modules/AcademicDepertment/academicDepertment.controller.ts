import AppError from '../../middleware/AppError'
import catchAsync from '../../utils/catchAsync'
import { academicDepertmentService } from './academicDepertment.Service'
import { AcademicDepertment } from './academicDepertment.model'
const createAcademicDepertment = catchAsync(async (req, res) => {
  const result = await academicDepertmentService.createAcademicDepertmentIntoDB(
    req.body,
  )
  res.status(200).json({
    success: true,
    message: 'Academic department created successfully',
    data: result,
  })
})
const getAllAcademicDepertment = catchAsync(async (req, res) => {
  const result =
    await academicDepertmentService.getAllAcademicDepertmentFromDB();
  res.status(200).json({
    success: true,
    message: 'All academic department retrieved successfully',
    data: result,
  })
})
const getSingleAcademicDepertment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await academicDepertmentService.getSingleAcademicDepertmentFromDB(id)
  res.status(200).json({
    success: true,
    message: 'Single academic department retrieved successfully',
    data: result,
  })
})
const updateSingleAcademicDepertment = catchAsync(async (req, res) => {
  const { id } = req.params
  const isDepartmentExist = await AcademicDepertment.findById(id);
  if (!isDepartmentExist) {
    throw new AppError(404,'Academic department does not exist') 
  }
  const result =
    await academicDepertmentService.updateSingleAcademicDepertmentIntoDB(
      id,
      req.body,
    )
  res.status(200).json({
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  })
})
export const academicDepertmentController = {
  createAcademicDepertment,
  getAllAcademicDepertment,
  getSingleAcademicDepertment,
  updateSingleAcademicDepertment,
}
