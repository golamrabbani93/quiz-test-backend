import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'devrabbani9@gmail.com',
      pass: 'shsw pxbi lkwm nvlh',
    },
  })

  await transporter.sendMail({
    from: 'devrabbani9@gmail.com', // sender address
    to, // list of receivers
    subject: 'Your OTP Code', // Subject line
    text: '', // plain text body
    html, // html body
  })
}
