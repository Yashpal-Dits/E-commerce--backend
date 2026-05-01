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


export const adminMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== "admin") {
      throw new ApiError(403, "Admin access required");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const sellerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== "seller") {
      throw new ApiError(403, "Seller access required");
    }
    next();
  } catch (error) {
    next(error);
  }
};