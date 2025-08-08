import { model, Schema } from 'mongoose'
import { IQuestion } from './question.interface'

export const questionSchema = new Schema<IQuestion>(
  {
    competency: { type: String, required: true },
    level: { type: String, required: true },
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctOptionIndex: { type: Number, required: true },
  },
  { timestamps: true },
)

export const Question = model<IQuestion>('Question', questionSchema)
