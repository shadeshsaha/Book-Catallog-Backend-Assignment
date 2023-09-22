import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);

router.post('/create-category', CategoryController.createCategory);

export const CategoryRoutes = router;
