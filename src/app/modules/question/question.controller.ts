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
// get all questions
const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await questionServices.getAllQuestionsFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Questions retrieved successfully',
    data: result,
  })
})
// get question by id
const getQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await questionServices.getQuestionByIdFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question retrieved successfully',
    data: result,
  })
})
// update question by id
const updateQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const questionData = req.body
  const result = await questionServices.updateQuestionByIdInDB(id, questionData)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question updated successfully',
    data: result,
  })
})
// delete question by id
const deleteQuestionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await questionServices.deleteQuestionByIdFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question deleted successfully',
    data: result,
  })
})

export const questionController = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
}
