// email: { type: String, required: true },
// otp: { type: String, required: true },
// expiresAt: { type: Date, required: true },
// verified: { type: Boolean, default: false },
// resendCount: { type: Number, default: 0 },

export interface IOtp {
  email: string
  otp: string
  expiresAt: Date
  verified: boolean
  resendCount: number
}
