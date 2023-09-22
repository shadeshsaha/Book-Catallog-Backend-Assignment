import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);

router.post('/create-category', CategoryController.createCategory);

router.patch('/:id', CategoryController.updateCategory);

export const CategoryRoutes = router;
