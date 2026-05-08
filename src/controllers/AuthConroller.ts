import { Response, NextFunction } from "express";
import { userService } from "../services/UserService";
import { sendResponse } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import {
  AuthRequest,
  AuthResponseData,
  ProfileResponseData,
  RegisterRequestBody,
  LoginRequestBody,
  UpdateProfileRequestBody
} from "../types";
import { ApiError } from "../utils";
import { Messages } from "../constants/messages";
import { UserRole } from "../entities";

export class AuthController {
  register = asyncHandler(
    async (req: AuthRequest, res: Response, _next: NextFunction) => {
      const body = req.body as RegisterRequestBody;
      if (!body.first_name || !body.last_name || !body.email || !body.password) {
        throw new ApiError(400, Messages.VALIDATION.REQUIRED_FIELD)
      }

      const result = await userService.register({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        role: body.role as UserRole | undefined,
      });

      return sendResponse<AuthResponseData>(
        res,
        201,
        Messages.AUTH.RESISTER_SUCCESS,
        result
      );
    }
  );

  login = asyncHandler(
    async (req: AuthRequest, res: Response, _next: NextFunction) => {
      const body = req.body as LoginRequestBody;

      if (!body.email || !body.password) {
        throw new ApiError(400, Messages.VALIDATION.REQUIRED_FIELD);
      }

      const result = await userService.login(body.email, body.password);

      return sendResponse<AuthResponseData>(
        res,
        200,
        Messages.AUTH.LOGIN_SUCCESS,
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
        Messages.AUTH.PROFILE_RETRIEVED,
        { user }
      );
    }
  );

  updateProfile = asyncHandler(
    async (req: AuthRequest, res: Response, _next: NextFunction) => {
      const userId = req.user!.id;
      const body = req.body as UpdateProfileRequestBody;

      const user = await userService.updateProfile(userId, {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
      });

      return sendResponse<ProfileResponseData>(
        res,
        200,
        Messages.AUTH.PROFILE_UPDATED,
        { user }
      );
    }
  );
}

export const authController = new AuthController();