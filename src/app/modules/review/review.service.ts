import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createReview = async (
  payload: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data: payload,
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

const getReviewsFromDB = async (): Promise<Partial<ReviewAndRating>[]> => {
  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

const getSingleReview = async (
  id: string
): Promise<Partial<ReviewAndRating | null>> => {
  const result = await prisma.reviewAndRating.findFirst({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

const updateReviewDataToDB = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<Partial<ReviewAndRating | null>> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
    data: payload,
  });
  return result;
};

const deleteReviewFromDB = async (
  id: string
): Promise<Partial<ReviewAndRating | null>> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

export const ReviewService = {
  createReview,
  getReviewsFromDB,
  getSingleReview,
  updateReviewDataToDB,
  deleteReviewFromDB,
};
