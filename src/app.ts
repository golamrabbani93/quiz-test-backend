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
const allowedOrigins = [
  'https://quiz-test-rho.vercel.app',
  'http://localhost:5173',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
)

// Preflight route
app.options('*', cors())
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
