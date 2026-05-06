import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

// Middleware to validate numeric ID parameter
export const validateIdParam = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    // Type guard: ensure id is a string and not undefined
    if (typeof id !== "string" || !id) {
      throw new ApiError(400, "ID parameter is required");
    }

    const numericId = parseInt(id, 10);

    if (isNaN(numericId) || numericId <= 0) {
      throw new ApiError(400, "Invalid ID parameter");
    }

    // Attach the parsed ID to the request for use in controllers
    (req as any).numericId = numericId;

    next();
  } catch (error) {
    next(error);
  }
};