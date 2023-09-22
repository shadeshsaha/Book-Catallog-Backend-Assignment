import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUserResponse } from './auth.interfaces';

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

const signIn = async (
  payload: Pick<User, 'email' | 'password'>
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;

  const isExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Does Not Exists!');
  }

  if (isExists.password !== password)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Does Not Match');

  // create access token & refresh token
  const { id, role } = isExists;

  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  signUp,
  signIn,
};
