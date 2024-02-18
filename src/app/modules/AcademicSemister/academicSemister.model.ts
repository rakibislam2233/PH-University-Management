import { Schema, model } from 'mongoose'
import { TAcademicSemister } from './academicSemister.interface'
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './acedemicSemister.constant'

const academicSemiterModel = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemisterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemisterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)

//document pre hook

academicSemiterModel.pre('save', async function (next) {
  const isSemisterExist = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  })
  if (isSemisterExist) {
    throw new Error('Semester already exists')
  }
  next()
})

export const AcademicSemister = model<TAcademicSemister>(
  'academicSemister',
  academicSemiterModel,
)
