import { z } from 'zod'
const createAcademicDepertmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
      required_error: 'name must be required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academicFaculty must be string',
      required_error: 'academicFaculty must be required',
    }),
  }),
})
const updateAcademicDepertmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name must be string',
        required_error: 'name must be required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'academicFaculty must be string',
        required_error: 'academicFaculty must be required',
      })
      .optional(),
  }),
})
export const academicDepertmentValidation = {
  createAcademicDepertmentValidationSchema,
  updateAcademicDepertmentValidationSchema,
}
