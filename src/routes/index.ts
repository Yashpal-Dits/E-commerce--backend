import { Router } from "express";
import authRoutes from "./authRoutes";

const router = Router();

// Mount routes
router.use("/auth", authRoutes);

// Future routes
// router.use("/products", productRoutes);
// router.use("/categories", categoryRoutes);
// router.use("/orders", orderRoutes);

export default router;