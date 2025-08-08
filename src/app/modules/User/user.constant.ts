import { TRole } from './user.interface'

export const Role: TRole[] = ['admin', 'student', 'supervisor']

export const USER_ROLE = {
  admin: 'admin',
  student: 'student',
  supervisor: 'supervisor',
} as const
