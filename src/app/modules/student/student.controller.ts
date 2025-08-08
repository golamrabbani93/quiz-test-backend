import { Request, Response } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// !Get all Student
const getStudents = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await studentServices.getAllStudentIntoDB(query);
  if (result.length > 0) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Student Not Found',
      data: null,
    });
  }
});

// ! Upadte student Data

const updateStudentData = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id as string;

  const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student update Successful',
    data: result,
  });
});

// ! Delete A Student By id

const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id as string;
  const result = await studentServices.deleteSingleStudentIntoDb(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Student Successful',
    data: result,
  });
});

export const studentController = {
  getStudents,
  deleteSingleStudent,
  updateStudentData,
};
