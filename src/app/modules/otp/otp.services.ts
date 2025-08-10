import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { sendEmail } from '../../utils/sendEmail'
import { Otp } from './otp.model'
import { User } from '../User/user.model'

const OTP_EXPIRATION_MINUTES = 5
const RESEND_LIMIT = 3
const RESEND_INTERVAL_SECONDS = 30

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString()

const createOrResendOtp = async (email: string) => {
  const otp = generateOtp()
  const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60000)

  let existing = await Otp.findOne({ email, verified: false })
  if (existing) {
    const secondsSinceLast =
      (Date.now() -
        existing.expiresAt.getTime() +
        OTP_EXPIRATION_MINUTES * 60000) /
      1000
    if (existing.resendCount >= RESEND_LIMIT)
      throw new Error('Resend limit exceeded')
    if (secondsSinceLast < RESEND_INTERVAL_SECONDS)
      throw new Error(
        `Wait ${Math.ceil(RESEND_INTERVAL_SECONDS - secondsSinceLast)} seconds before resend`,
      )

    existing.otp = otp
    existing.expiresAt = expiresAt
    existing.resendCount++
    await existing.save()
  } else {
    existing = new Otp({ email, otp, expiresAt, resendCount: 0 })
    await existing.save()
  }
  sendEmail(
    email,
    `<p>Your OTP code is: <strong>${otp}</strong>. It expires in ${OTP_EXPIRATION_MINUTES} minutes.</p>`,
  )
  return { message: 'OTP sent to email' }
}

const verifyOtp = async (email: string, otp: string) => {
  const record = await Otp.findOne({ email, otp, verified: false })

  if (!record) throw new AppError(httpStatus.NOT_FOUND, 'Invalid OTP')
  if (record.expiresAt < new Date())
    throw new AppError(httpStatus.UNAUTHORIZED, 'OTP expired')

  record.verified = true
  //find user and update isUserExistsByEmail
  const user = await User.findOne({ email })
  if (user) {
    user.isEmailVerified = true
    await user.save()
  }
  await record.save()
  return { message: 'OTP verified' }
}

export const otpService = {
  createOrResendOtp,
  verifyOtp,
}
