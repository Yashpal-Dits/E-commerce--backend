import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Verify JWT token and attach user to request
export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw new ApiError(401, "Invalid or expired token");
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

// Ensure user is an admin
export const adminMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }
    if (req.user.role !== "admin") {
      throw new ApiError(403, "Admin access required");
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Ensure user is a seller
export const sellerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }
    if (req.user.role !== "seller") {
      throw new ApiError(403, "Seller access required");
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Ensure user is a customer
export const customerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }
    if (req.user.role !== "customer") {
      throw new ApiError(403, "Customer access required");
    }
    next();
  } catch (error) {
    next(error);
  }
};

// Allow multiple roles (e.g., seller OR admin)
export const hasAnyRole = (allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(401, "User not authenticated");
      }
      if (!allowedRoles.includes(req.user.role)) {
        throw new ApiError(
          403,
          `Access requires one of these roles: ${allowedRoles.join(", ")}`
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};