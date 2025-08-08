import { Schema, model } from 'mongoose'
import { TStudent } from './student.interface'

export const studentSchema = new Schema<TStudent>({
  name: { type: String, required: true },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  gender: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  contactNo: { type: String, default: '' },
  certificationLevel: {
    type: String,
    default: '',
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export const Student = model<TStudent>('Student', studentSchema)
