import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { academicDepertmentController } from './academicDepertment.controller'
import { academicDepertmentValidation } from './academicDepertment.validation'
const router = express.Router()
router.post(
  '/',
  validateRequest(
    academicDepertmentValidation.createAcademicDepertmentValidationSchema,
  ),
  academicDepertmentController.createAcademicDepertment,
)
router.get('/', academicDepertmentController.getAllAcademicDepertment)
router.get('/:id', academicDepertmentController.getSingleAcademicDepertment)
router.patch(
  '/:id',
  validateRequest(
    academicDepertmentValidation.updateAcademicDepertmentValidationSchema,
  ),
  academicDepertmentController.updateSingleAcademicDepertment,
)
export const academicDepertmentRoutes = router
