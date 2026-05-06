import { Router } from "express";
import { categoryController } from "../controllers/CategoryController";
import { authMiddleware, adminMiddleware, validateRequest, validateIdParam } from "../middlewares";
import { createCategorySchema, updateCategorySchema } from "../validators";

const router = Router();

// PUBLIC ROUTES - Anyone can view (no authentication required)
router.get("/", categoryController.getAll);
router.get("/:id", validateIdParam, categoryController.getById);

// PROTECTED ADMIN ROUTES - Only admins can create, update, delete
router.post(
  "/",
  authMiddleware,             
  adminMiddleware,             
  validateRequest(createCategorySchema), 
  categoryController.create
);

router.put(
  "/:id",
  authMiddleware,              
  adminMiddleware,            
  validateIdParam,             
  validateRequest(updateCategorySchema), 
  categoryController.update
);

router.delete(
  "/:id",
  authMiddleware,              
  adminMiddleware,             
  validateIdParam,             
  categoryController.delete
);

export default router;