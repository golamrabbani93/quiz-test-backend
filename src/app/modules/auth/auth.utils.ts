import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'

export const createToken = (
  jwtPayload: {
    userId: string | undefined
    userEmail: string | undefined
    role: string | undefined
  },
  secret: Secret,
  expiresIn: string | number,
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  }
  return jwt.sign(jwtPayload, secret, options)
}
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload
}
