import { z } from 'zod'
import { Role } from './user.constant'

export const RegisterValidatioonSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
        required_error: 'Name is required',
      })
      .min(1),
    email: z
      .string({
        invalid_type_error: 'Email must be string',
        required_error: 'Email is required',
      })
      .email({ message: 'Email is required And Email must be string' }),
    password: z
      .string({
        invalid_type_error: 'Password must be String',
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password must be 6 character or more ' }),
  }),
})

export const UserUpdateValidatioonSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }),
})
export const userValidation = {
  RegisterValidatioonSchema,
  UserUpdateValidatioonSchema,
}
