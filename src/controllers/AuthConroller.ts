import { Response, NextFunction } from "express";
import { userService } from "../services/UserService";
import { sendResponse } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest, AuthResponseData, ProfileResponseData } from "../types";

export class AuthController {
  register = asyncHandler(
    async (req: AuthRequest, res: Response, _next: NextFunction) => {
      const { first_name, last_name, email, password, role } = req.body;

      const result = await userService.register({
        first_name,
        last_name,
        email,
        password,
        role,
      });

      return sendResponse<AuthResponseData>(
        res,
        201,
        "User registered successfully",
        result
      );
    }
  );

  login = asyncHandler(
    async (req: AuthRequest, res: Response, _next: NextFunction) => {
      const { email, password } = req.body;

      const result = await userService.login(email, password);

      return sendResponse<AuthResponseData>(
        res,
        200,
        "Login successful",
        result
      );
    }
  );

  getProfile = asyncHandler(
    async (req: AuthRequest, res: Response, _next: NextFunction) => {
      const userId = req.user!.id;

      const user = await userService.getProfile(userId);

      return sendResponse<ProfileResponseData>(
        res,
        200,
        "Profile retrieved successfully",
        { user }
      );
    }
  );

  updateProfile = asyncHandler(
    async (req: AuthRequest, res: Response, _next: NextFunction) => {
      const userId = req.user!.id;
      const { first_name, last_name, email } = req.body;

      const user = await userService.updateProfile(userId, {
        first_name,
        last_name,
        email,
      });

      return sendResponse<ProfileResponseData>(
        res,
        200,
        "Profile updated successfully",
        { user }
      );
    }
  );
}

export const authController = new AuthController();