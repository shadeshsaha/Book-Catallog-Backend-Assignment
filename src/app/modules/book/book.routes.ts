import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.get('/:categoryId/category', BookController.getBookByCategoryId);

router.post(
  '/create-book',
  auth(UserRole.admin),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook
);

router.delete('/:id', auth(UserRole.admin), BookController.deleteBook);

export const BookRoutes = router;
