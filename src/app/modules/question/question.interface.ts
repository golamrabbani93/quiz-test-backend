export interface IQuestion {
  competency: string
  level: string
  questionText: string
  options: string[]
  correctOptionIndex: number
  time: number
  createdAt: Date
  updatedAt: Date
}
