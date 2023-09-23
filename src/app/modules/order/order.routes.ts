import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.get('/', auth(UserRole.admin), OrderController.getAllOrders);
router.get(
  '/:orderId',
  auth(UserRole.admin, UserRole.customer),
  OrderController.getSingleOrder
);

router.post(
  '/create-order',
  auth(UserRole.customer),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

export const OrderRoutes = router;
