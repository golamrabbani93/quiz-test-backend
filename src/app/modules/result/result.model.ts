import { model, Schema } from 'mongoose'
import { IResult } from './result.interface'

export const resultSchema = new Schema<IResult>({
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
  step: { type: Number, required: true },
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    required: true,
  },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Result = model<IResult>('Result', resultSchema)
