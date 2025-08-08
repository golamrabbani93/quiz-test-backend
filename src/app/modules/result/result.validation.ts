import z from 'zod'

const createResultValidation = z.object({
  body: z.object({
    step: z
      .number({
        required_error: 'Step is required',
        invalid_type_error: 'Step must be a number',
      })
      .min(1),
    level: z.string({
      required_error: 'Level is required',
      invalid_type_error: 'Level must be a string',
    }),
    score: z
      .number({
        required_error: 'Score is required',
        invalid_type_error: 'Score must be a number',
      })
      .min(0),
    totalQuestions: z
      .number({
        required_error: 'Total questions is required',
        invalid_type_error: 'Total questions must be a number',
      })
      .min(0),
    correctAnswers: z
      .number({
        required_error: 'Correct answers is required',
        invalid_type_error: 'Correct answers must be a number',
      })
      .min(0),
  }),
})

export const resultValidation = {
  create: createResultValidation,
}
