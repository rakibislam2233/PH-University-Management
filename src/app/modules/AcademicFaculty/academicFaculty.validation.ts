//academicFaculty validation
import { z } from 'zod'
const createAcademicacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
    }),
  }),
})
const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
    }),
  }),
})
export const academicFacultyValidation = {
  createAcademicacademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
}
