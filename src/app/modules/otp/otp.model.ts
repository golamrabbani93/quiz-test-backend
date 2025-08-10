import { model, Schema } from 'mongoose'
import { IOtp } from './otp.interface'

export const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  resendCount: { type: Number, default: 0 },
})

export const Otp = model<IOtp>('Otp', otpSchema)
