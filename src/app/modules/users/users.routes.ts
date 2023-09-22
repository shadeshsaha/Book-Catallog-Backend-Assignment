import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './users.controller';
import { UserValidation } from './users.validation';

const router = express.Router();

router.get('/', auth(UserRole.admin), UserController.getAllUsers);
router.get('/:id', auth(UserRole.admin), UserController.getUserById);

router.patch(
  '/:id',
  auth(UserRole.admin),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete('/:id', auth(UserRole.admin), UserController.deleteUser);

export const UserRoutes = router;
