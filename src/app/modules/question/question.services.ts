import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { IQuestion } from './question.interface'
import { Question } from './question.model'

// Save question to database
const saveQuestionToDB = async (payload: IQuestion) => {
  const question = await Question.create(payload)
  return question
}
// get all questions from database
const getAllQuestionsFromDB = async () => {
  const questions = await Question.find()
  return questions
}
// get question by id from database
const getQuestionByIdFromDB = async (id: string) => {
  const question = await Question.findById(id)
  return question
}

//update question by id in database
const updateQuestionByIdInDB = async (
  id: string,
  payload: Partial<IQuestion>,
) => {
  const question = await Question.findByIdAndUpdate(id, payload, { new: true })
  if (!question) {
    throw new AppError(httpStatus.NOT_FOUND, 'Question not found')
  }
  return question
}
//delete question by id from database
const deleteQuestionByIdFromDB = async (id: string) => {
  const question = await Question.findByIdAndDelete(id)
  return question
}

export const questionServices = {
  saveQuestionToDB,
  getAllQuestionsFromDB,
  getQuestionByIdFromDB,
  updateQuestionByIdInDB,
  deleteQuestionByIdFromDB,
}
