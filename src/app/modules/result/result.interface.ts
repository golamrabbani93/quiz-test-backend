import { Types } from 'mongoose'

export interface IResult {
  user: Types.ObjectId
  step: number
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
  score: number
  totalQuestions: number
  correctAnswers: number
  createdAt: Date
  updatedAt: Date
}
