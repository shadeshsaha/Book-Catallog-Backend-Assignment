import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const id = decodedToken?.payload?.id as string;
  const role = decodedToken?.payload?.role as string;

  const result = await OrderService.createOrder(id, role, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  // console.log('access', accessToken);
  // console.log('decoded', decodedToken);

  const id = decodedToken?.payload?.id as string;
  const role = decodedToken?.payload?.role as string;
  // console.log('id:', id);
  // console.log('role:', role);

  const result = await OrderService.getAllOrders(id, role);
  // console.log('result', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Orders Data Retrieved Successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
