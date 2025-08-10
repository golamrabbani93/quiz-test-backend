import express from 'express'
import { sendOtpHandler, verifyOtpHandler } from './otp.controller'

const router = express.Router()

router.post('/send-otp', sendOtpHandler)
router.post('/verify-otp', verifyOtpHandler)

export const otpRoutes = router
