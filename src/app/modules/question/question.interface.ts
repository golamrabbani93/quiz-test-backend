export interface IQuestion {
  competency: string
  level: string
  questionText: string
  options: string[]
  correctOptionIndex: number
  createdAt: Date
  updatedAt: Date
}
