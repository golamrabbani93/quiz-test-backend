import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFoundRoute from './app/middlewares/notFoundRoute'
import router from './app/routes'
const app: Application = express()
import cookieParser from 'cookie-parser'
// ! Parser
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = ['http://localhost:5173']
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // VERY IMPORTANT to allow cookies / credentials
  }),
)

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
