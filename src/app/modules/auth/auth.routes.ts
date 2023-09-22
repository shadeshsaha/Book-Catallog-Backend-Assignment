import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signUpZodSchema),
  AuthController.signUp
);

router.post(
  '/signin',
  validateRequest(AuthValidation.signInZodSchema),
  AuthController.signIn
);

export const AuthRoutes = router;
