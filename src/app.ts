import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/router'
const app: Application = express()
//parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)
app.use('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to my server',
  })
})
app.use(globalErrorHandler)
app.use(notFound)
export default app
