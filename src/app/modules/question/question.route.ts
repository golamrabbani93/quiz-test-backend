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
router.get(
  '/',
  auth(USER_ROLE.student, USER_ROLE.supervisor, USER_ROLE.admin),
  questionController.getAllQuestions,
)
router.get(
  '/:id',
  auth(USER_ROLE.supervisor, USER_ROLE.admin),
  questionController.getQuestionById,
)
router.put(
  '/:id',
  auth(USER_ROLE.supervisor, USER_ROLE.admin),
  validateRequest(questionValidation.update),
  questionController.updateQuestionById,
)
router.delete(
  '/:id',
  auth(USER_ROLE.supervisor, USER_ROLE.admin),
  questionController.deleteQuestionById,
)

export const questionRoutes = router
