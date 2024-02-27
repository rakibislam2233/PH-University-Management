import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicSemisterValidation } from './academicSemister.validation'
import { academicSemisterController } from './academicSemister.controller'

const router = express.Router()
router.post(
  '/',
  validateRequest(
    academicSemisterValidation.createAcademicSemisterValidationSchema,
  ),
  academicSemisterController.createAcademicSemister,
)
router.get('/', academicSemisterController.getAllAcademicSemister)
router.get('/:id', academicSemisterController.getSingleAcademicSemister)
router.patch(
  '/:id',
  validateRequest(
    academicSemisterValidation.updateAcademicSemisterValidationSchema,
  ),
  academicSemisterController.updateSingleAcademicSemister,
)
export const academicSemisterRoutes = router
