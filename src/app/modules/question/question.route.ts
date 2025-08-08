import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../User/user.constant'
import validateRequest from '../../middlewares/validateRequest'
import { questionValidation } from './question.validation'
import { questionController } from './question.controller'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.supervisor, USER_ROLE.admin),
  validateRequest(questionValidation.create),
  questionController.createQuestion,
)

export const questionRoutes = router
