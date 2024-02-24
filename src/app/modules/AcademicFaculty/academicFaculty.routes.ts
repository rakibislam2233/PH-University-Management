import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicFacultyController } from './academicFaculty.controller'
import { academicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()
router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicacademicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
)
router.get(
  '/all-academic-faculty',
  academicFacultyController.getAllAcademicFaculty,
)
router.get(
  '/single-academic-faculty/:id',
  academicFacultyController.getSingleAcademicFaculty,
)
router.patch(
  '/single-academic-faculty-update/:id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updateSingleAcademicFaculty,
)
export const academicFacultyRoutes = router
