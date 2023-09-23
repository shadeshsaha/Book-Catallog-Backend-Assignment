import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.get('/:categoryId/category', BookController.getBookByCategoryId);

router.post('/create-book', BookController.createBook);

router.patch('/:id', BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
