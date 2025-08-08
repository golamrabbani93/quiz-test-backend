import { Response } from 'express'
type TResponse<T> = {
  statusCode: number
  success: boolean
  message?: string
  token?: string
  refreshToken?: string
  data?: T
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data?.statusCode,
    message: data.message,
    token: data.token,
    refreshToken: data.refreshToken,
    data: data.data,
  })
}

export default sendResponse
