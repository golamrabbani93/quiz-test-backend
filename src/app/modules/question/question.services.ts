import { IQuestion } from './question.interface'
import { Question } from './question.model'

// Save question to database
const saveQuestionToDB = async (payload: IQuestion) => {
  const question = await Question.create(payload)
  return question
}

export const questionServices = {
  saveQuestionToDB,
}
