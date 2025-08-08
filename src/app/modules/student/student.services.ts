//! Save Student data to Database

import mongoose from 'mongoose'

import httpStatus from 'http-status'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/queryBuilder'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import { User } from '../User/user.model'

const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user', 'role status -_id')
      .populate('academicSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search([])
    .sort()
    .filter()
    .paginate()
    .fields()
  const result = await studentQuery.modelQuery
  return result
}

// !Delete A Student By id

const deleteSingleStudentIntoDb = async (id: string) => {
  const session = await mongoose.startSession()
  // !Delete user From UserCollection

  try {
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
  }
}
// !update Student Data by student id
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const updatedStudent = await Student.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedStudent
}
export const studentServices = {
  getAllStudentIntoDB,
  deleteSingleStudentIntoDb,
  updateStudentIntoDB,
}
