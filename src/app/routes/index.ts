import { Router } from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { userRoutes } from '../modules/User/user.route'
import { questionRoutes } from '../modules/question/question.route'
import { resultRoutes } from '../modules/result/result.route'
import { otpRoutes } from '../modules/otp/otp.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/question',
    route: questionRoutes,
  },
  {
    path: '/result',
    route: resultRoutes,
  },
  {
    path: '/otp',
    route: otpRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
