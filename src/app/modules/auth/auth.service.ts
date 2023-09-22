import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const signUp = async (
  payload: User
): Promise<
  Pick<
    User,
    'id' | 'name' | 'email' | 'role' | 'contactNo' | 'address' | 'profileImg'
  >
> => {
  const isExists = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists!');
  }

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

export const AuthService = {
  signUp,
};
