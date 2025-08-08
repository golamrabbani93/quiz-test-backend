import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFoundRoute from './app/middlewares/notFoundRoute'
import router from './app/routes'
const app: Application = express()

// ! Parser
app.use(express.json())
app.use(cors())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Test-School server is running')
})

//* application routes
app.use('/api', router)

// *Global Error Handler
app.use(globalErrorHandler)

// * Not Found Route
app.use(notFoundRoute)

export default app
