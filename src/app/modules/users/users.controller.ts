import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UserFilterAbleFileds } from './users.constants';
import { UserService } from './users.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, options);
  // const { meta, data } = await UserService.getAllUsers(filters, options);

  //   const result = data.map(user => {
  //     const { password, ...others } = user;
  //     console.log(password);
  //     return others;
  //   });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users Data Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User Data Fetched Successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await UserService.updateUser(id, data);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUserById,
  updateUser,
};
