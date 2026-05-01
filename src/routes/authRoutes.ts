import { Router } from "express";
import { authController } from "../controllers/AuthConroller"
import { validateRequest, authMiddleware } from "../middlewares";
import { registerSchema, loginSchema, updateUserSchema } from "../validators";

const router = Router();

// Public routes
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.login
);

// Protected routes (require authentication)
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile
);

router.put(
  "/profile",
  authMiddleware,
  validateRequest(updateUserSchema),
  authController.updateProfile
);

export default router;