import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'
import { TLoginUser } from './auth.interface'
import jwt from 'jsonwebtoken'
import config from '../../config'
import { USER_ROLE } from '../User/user.constant'
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
    userId: existsUser._id,
    userEmail: existsUser.email,
    role: existsUser.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  })
  // add refresh token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '30d',
    },
  )
  return {
    existsUser,
    accessToken,
    refreshToken,
  }
}
export const authServices = {
  registerUserIntoDB,
  loginUser,
}
