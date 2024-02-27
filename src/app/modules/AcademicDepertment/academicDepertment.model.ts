import { Schema, model } from 'mongoose'
import { TAcademicDepertment } from './academicDepertment.interface'

const academicDepertmentSchema = new Schema<TAcademicDepertment>({
  name: {
    type: String,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
})

export const AcademicDepertment = model<TAcademicDepertment>(
  'AcademicDepertment',
  academicDepertmentSchema,
)
