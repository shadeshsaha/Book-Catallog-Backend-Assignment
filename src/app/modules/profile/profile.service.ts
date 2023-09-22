import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getProfile = async (userId: string): Promise<User | null> => {
  console.log(userId);
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return result;
};

export const ProfileService = { getProfile };
