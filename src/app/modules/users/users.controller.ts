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

  const { meta, data } = await UserService.getAllUsers(filters, options);

  const result = data.map(user => {
    const { password, ...others } = user;
    console.log(password);
    return others;
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users Retrieved Successfully',
    meta: meta,
    data: result,
  });
});

export const UserController = {
  getAllUsers,
};
