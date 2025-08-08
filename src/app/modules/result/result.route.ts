import express from 'express'
import { resultController } from './result.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'
import validateRequest from '../../middlewares/validateRequest'
import { resultValidation } from './result.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.student),
  validateRequest(resultValidation.create),
  resultController.createResult,
)
export const resultRoutes = router
