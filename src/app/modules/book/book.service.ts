import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { BookSearchableFields } from './book.constants';
import { IBookFilterRequest } from './book.interfaces';

const createBook = async (data: Book): Promise<Book> => {
  //   console.log(data);
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const { search, category, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (category) {
    andConditions.push({
      categoryId: {
        equals: category,
      },
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({ price: { gte: Number(minPrice) } });
  }

  if (maxPrice !== undefined) {
    andConditions.push({ price: { lte: Number(maxPrice) } });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    include: {
      category: true,
      reviewAndRatings: true,
    },
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { title: 'desc' },
  });

  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getAllBooks,
};
