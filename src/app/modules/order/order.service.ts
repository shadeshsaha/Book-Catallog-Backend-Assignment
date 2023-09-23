import { UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICreateOrderData } from './order.interfaces';

const createOrder = async (
  id: string,
  role: string,
  data: ICreateOrderData
) => {
  if (role !== UserRole.customer) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to create an order!'
    );
  }

  const { orderedBooks } = data;

  const result = await prisma.order.create({
    data: {
      userId: id,
      orderedBooks: {
        create: orderedBooks.map((item: any) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getAllOrders = async (id: string, role: string) => {
  let result;

  if (role === UserRole.admin) {
    result = await prisma.order.findMany({
      // where: {
      //   userId: id,
      // },
      // include: {
      //   orderedBooks: true,
      // },

      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
    return result;
  }

  if (role === UserRole.customer) {
    result = await prisma.order.findMany({
      // where: {
      //   userId: id,
      // },
      // include: {
      //   orderedBooks: true,
      // },

      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    return result;
  }
};

const getSingleOrder = async (
  userId: string,
  role: string,
  orderId: string
) => {
  let result;

  if (role === UserRole.admin) {
    result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });
    return result;
  }

  if (role === UserRole.customer) {
    result = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId,
      },
      include: {
        user: true,
        orderedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found!');

    return result;
  }
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
