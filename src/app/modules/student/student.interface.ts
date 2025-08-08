import { Types } from 'mongoose'

export type TStudent = {
  name: string
  gender: string
  email: string
  user: Types.ObjectId
  avatar?: string
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  isDeleted: boolean
  certificationLevel: string
}
