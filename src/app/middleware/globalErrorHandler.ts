import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { TErrorSources } from '../interface/error'
import config from '../config'
import { handleZodError } from '../error/handleZodError'
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 400
  const success = false
  let message = error.message || 'Something went wrong!'
  let errorSources: TErrorSources = [{ path: '', message: '' }]

  //handle zod errors and customized for my formated;
  if (error instanceof ZodError) {
    const simplifiedZodError = handleZodError(error)
    statusCode = simplifiedZodError.statusCode
    message = simplifiedZodError.message
    errorSources = simplifiedZodError.errorSources
  }

  res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  })
}
export default globalErrorHandler
