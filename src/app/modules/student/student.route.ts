import express from 'express'
import { studentController } from './student.controller'

import { upadateZStudentSchema } from './student.validation'

const router = express.Router()

export const studentRoutes = router
