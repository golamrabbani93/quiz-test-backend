import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { questionServices } from './question.services'

//create question
const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const questionData = req.body
  const result = await questionServices.saveQuestionToDB(questionData)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Question Created successfully',
    data: result,
  })
})

export const questionController = {
  createQuestion,
}
