import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { resultServices } from './result.services'

const createResult = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user
  const resultData = req.body
  const result = await resultServices.createResultIntoDB(userId, resultData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result created successfully',
    data: result,
  })
})

export const resultController = {
  createResult,
}
