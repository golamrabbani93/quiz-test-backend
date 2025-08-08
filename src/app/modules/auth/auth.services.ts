import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TUser } from '../User/user.interface'
import { User } from '../User/user.model'
import { TLoginUser } from './auth.interface'
import jwt from 'jsonwebtoken'
import config from '../../config'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import { USER_ROLE } from '../User/user.constant'
// *Register User Info In to Database
const registerUserIntoDB = async (payload: TUser) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //! create a user
    const newUser = await User.create([payload], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed To create User')
    }

    if (newUser[0].role === USER_ROLE.student) {
      const newStudent = await Student.create(
        [
          {
            user: newUser[0].id,
            name: newUser[0].name,
            email: newUser[0].email,
          },
        ],
        { session },
      )

      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed To create Student')
      }
    }
    if (newUser[0].role === USER_ROLE.supervisor) {
      console.log('supervisor')
    }
    await session.commitTransaction()
    await session.endSession()
    return newUser[0]
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
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
