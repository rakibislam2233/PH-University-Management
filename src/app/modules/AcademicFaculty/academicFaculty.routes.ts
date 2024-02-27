import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicFacultyController } from './academicFaculty.controller'
import { academicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()
router.post(
  '/',
  validateRequest(
    academicFacultyValidation.createAcademicacademicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
)
router.get(
  '/',
  academicFacultyController.getAllAcademicFaculty,
)
router.get(
  '/:id',
  academicFacultyController.getSingleAcademicFaculty,
)
router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updateSingleAcademicFaculty,
)
export const academicFacultyRoutes = router
