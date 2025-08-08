import { z } from 'zod'

// Define Zod schema for Student
export const createZStudentSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Full Name name is required',
    }),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: z.string().optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    contactNo: z.string({
      required_error: 'Contact Number is required',
    }),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
  }),
})
// Define Zod schema for Student
export const upadateZStudentSchema = z.object({
  body: z.object({
    student: z.object({
      name: z.string({
        required_error: 'Full Name name is required',
      }),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    }),
  }),
})
