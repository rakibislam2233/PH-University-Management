import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoutes } from './app/modules/Student/student.routes'
const app: Application = express()
//parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/student', studentRoutes)
app.use('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to my server',
  })
})
export default app
