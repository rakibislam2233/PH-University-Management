import { z } from 'zod'

const createUserNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
})

const createGuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

const createLocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      admissionSemister: z.string(),
      guardian: createGuardianSchema,
      localGuardian: createLocalGuardianSchema,
      profileImg: z.string(),
    }),
  }),
})
const updateUserNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateGuardianSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
})

const updateLocalGuardianSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
})

export const updateStudentValidationSchema = z.object({
  body: z
    .object({
      student: z
        .object({
          name: updateUserNameSchema.optional(),
          gender: z.enum(['male', 'female', 'other']).optional(),
          dateOfBirth: z.string().optional(),
          email: z.string().email().optional(),
          contactNo: z.string().optional(),
          emergencyContactNo: z.string().optional(),
          bloogGroup: z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
          presentAddress: z.string().optional(),
          permanentAddress: z.string().optional(),
          admissionSemister: z.string().optional(),
          guardian: updateGuardianSchema.optional(),
          localGuardian: updateLocalGuardianSchema.optional(),
          profileImg: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
})

export const studentValidate = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
