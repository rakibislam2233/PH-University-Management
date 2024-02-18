import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicSemisterValidation } from './academicSemister.validation'
import { academicSemisterController } from './academicSemister.controller'

const router = express.Router()
router.post(
  '/create-academic-semister',
  validateRequest(
    academicSemisterValidation.createAcademicSemisterValidationSchema,
  ),
  academicSemisterController.createAcademicSemister,
)
router.get(
  '/all-academic-semister',
  academicSemisterController.getAllAcademicSemister,
)
router.get(
  '/single-academic-semister/:id',
  academicSemisterController.getSingleAcademicSemister,
)
router.patch(
  '/single-academic-semister-update/:id',
  validateRequest(
    academicSemisterValidation.updateAcademicSemisterValidationSchema,
  ),
  academicSemisterController.updateSingleAcademicSemister,
)
export const academicSemisterRoutes = router
