import { NextFunction, Request, Response } from "express"
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error.message || 'Something went wrong!',
    error: error,
  })
}

export default globalErrorHandler