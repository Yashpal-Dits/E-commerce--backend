import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";
import {Messages} from "../constants/messages";

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
      throw new ApiError(401, Messages.AUTH.NO_TOKEN);
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw new ApiError(401, Messages.AUTH.INVALID_TOKEN);
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
    if (!req.user) {
      throw new ApiError(401, Messages.AUTH.USER_NOT_AUTHENTICATED);
    }
    if (req.user.role !== "admin") {
      throw new ApiError(403, Messages.AUTHORIZATION.ADMIN_REQUIRED);
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
    if (!req.user) {
      throw new ApiError(401, Messages.AUTH.USER_NOT_AUTHENTICATED);
    }
    if (req.user.role !== "seller") {
      throw new ApiError(403, Messages.AUTHORIZATION.SELLER_REQUIRED);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const customerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, Messages.AUTH.USER_NOT_AUTHENTICATED);
    }
    if (req.user.role !== "customer") {
      throw new ApiError(403, Messages.AUTHORIZATION.CUSTOMER_REQUIRED);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const hasAnyRole = (allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(401, Messages.AUTH.USER_NOT_AUTHENTICATED);
      }
      if (!allowedRoles.includes(req.user.role)) {
        throw new ApiError(403, Messages.AUTHORIZATION.ACCESS_DENIED);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};``