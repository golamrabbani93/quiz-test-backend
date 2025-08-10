import { Request, Response } from 'express'

import catchAsync from '../../utils/catchAsync'
import { otpService } from './otp.services'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

export const sendOtpHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body
    const result = await otpService.createOrResendOtp(email)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OTP sent successfully',
      data: result,
    })
  },
)

export const verifyOtpHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body
    if (!email || !otp)
      return res.status(400).json({ message: 'Email and OTP are required' })

    const result = await otpService.verifyOtp(email, otp)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OTP verified successfully',
      data: result,
    })
  },
)
