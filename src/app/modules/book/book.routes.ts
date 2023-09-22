import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/', BookController.getAllBooks);

router.post('/create-book', BookController.createBook);

export const BookRoutes = router;
