import { Router } from "express";
import authRoutes from "./authRoutes";
import categoryRoutes from "./categoryRoutes"

const router = Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);

// Future routes
// router.use("/products", productRoutes);
// router.use("/orders", orderRoutes);

export default router;