import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'
import { TLoginUser } from './auth.interface'

import config from '../../config'
import { USER_ROLE } from '../User/user.constant'
import { createToken, verifyToken } from './auth.utils'
// *Register User Info In to Database
const registerUserIntoDB = async (payload: TUser) => {
  //check role
  if (
    payload.role !== USER_ROLE.student &&
    payload.role !== USER_ROLE.supervisor
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not allowed to register this user',
    )
  }
  //! create a user
  const newUser = await User.create(payload)
  return newUser
}

// *Login User

const loginUser = async (payload: TLoginUser) => {
  // * Check User is Exists in Database
  const existsUser = await User.isUserExistsByEmail(payload?.email)
  if (!existsUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  //*checking if the password is correct
  if (
    !payload.password ||
    !existsUser.password ||
    !(await User.isPasswordMatched(payload.password, existsUser.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }
  //* Create JWT token and sent to the  client

  const jwtPayload = {
    userId: existsUser?._id,
    userEmail: existsUser?.email,
    role: existsUser?.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  )

  //refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { userEmail } = decoded

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  const jwtPayload = {
    userId: user._id,
    userEmail: user.email,
    role: user.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  )
  return {
    accessToken,
  }
}
export const authServices = {
  registerUserIntoDB,
  loginUser,
  refreshToken,
}
