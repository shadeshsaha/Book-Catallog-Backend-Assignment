import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';

const router = express.Router();

router.get(
  '/',
  auth(UserRole.admin, UserRole.customer),
  ReviewController.getReviewsFromDB
);

router.get(
  '/:id',
  auth(UserRole.admin, UserRole.customer),
  ReviewController.getSingleReview
);

router.post(
  '/create-review',
  auth(UserRole.customer),
  ReviewController.createReview
);

router.patch(
  '/:id',
  auth(UserRole.customer, UserRole.admin),
  ReviewController.updateReviewDataToDB
);
router.delete(
  '/:id',
  auth(UserRole.admin, UserRole.customer),
  ReviewController.deleteReviewFromDB
);

export const reviewRoutes = router;
