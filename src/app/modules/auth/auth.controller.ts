import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.services'
import catchAsync from '../../utils/catchAsync'
import { Request, Response } from 'express'
import config from '../../config'

// *Register A User
const RegisterUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await authServices.registerUserIntoDB(userData)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

// *Login A User
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginUserData = req.body
  const result = await authServices.loginUser(loginUserData)
  res.cookie('refreshToken', result?.refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: result?.accessToken,
  })
})
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await authServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  })
})
export const authControllers = {
  RegisterUser,
  loginUser,
  refreshToken,
}
