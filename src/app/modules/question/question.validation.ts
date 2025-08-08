import z from 'zod'

const createQuestionValidation = z.object({
  body: z.object({
    competency: z
      .string({
        required_error: 'Competency is required',
        invalid_type_error: 'Competency must be a string',
      })
      .min(2)
      .max(100),
    level: z
      .string({
        required_error: 'Level is required',
        invalid_type_error: 'Level must be a string',
      })
      .min(2)
      .max(100),
    questionText: z
      .string({
        required_error: 'Question text is required',
        invalid_type_error: 'Question text must be a string',
      })
      .min(10)
      .max(500),
    options: z
      .array(
        z.string({
          required_error: 'Option is required',
          invalid_type_error: 'Option must be a string',
        }),
      )
      .min(2)
      .max(4),
    correctOptionIndex: z
      .number({
        required_error: 'Correct option index is required',
        invalid_type_error: 'Correct option index must be a number',
      })
      .min(0),
  }),
})

const updateQuestionValidation = z.object({
  body: z.object({
    competency: z.string().min(2).max(100).optional(),
    level: z.string().min(2).max(100).optional(),
    questionText: z.string().min(10).max(500).optional(),
    options: z.array(z.string()).min(2).max(4).optional(),
    correctOptionIndex: z.number().min(0).max(3).optional(),
  }),
})

export const questionValidation = {
  create: createQuestionValidation,
  update: updateQuestionValidation,
}
