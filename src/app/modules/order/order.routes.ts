import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', OrderController.getAllOrders);

router.post('/create-order', OrderController.createOrder);

export const OrderRoutes = router;
