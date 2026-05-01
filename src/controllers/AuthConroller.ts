import { Request, Response, NextFunction } from "express";
import { userService } from "../services/UserService";
import { sendResponse } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";


export class AuthController {
    register = asyncHandler (
        async (req: Request,res: Response, _next:NextFunction) => {
            const {first_name, last_name, email, password, role} = req.body;

            const result = await userService.register({
                first_name, 
                last_name,
                email,
                password,
                role,
            });

            return sendResponse(
                res, 
                201,
                "User Register Successfully",
                result

            );
        }
    );

login = asyncHandler (
    async(req: Request, res: Response, _next: NextFunction) => {
        const {email, password}= req.body;
        const result = await userService.login(email, password);

        return  sendResponse(
            res, 
            201,
            "User login Successfully",
             result
        );
    }
);

 getProfile  = asyncHandler(
    async(req:Request, res: Response, _next: NextFunction) => {
         const userId = req.user!.id;
         const user = await userService.getProfile(userId);
          return sendResponse(
            res,
            200,
            "Profile retrived successfully",
            {user}
          );
    }
 );

 updateProfile = asyncHandler (
    async (req: Request, res: Response, _next: NextFunction) => {
         const userId = req.user!.id;
         const {first_name, last_name, email} = req.body;

         const user = await userService.updateProfile(userId, {
            first_name,
            last_name,
            email,
         });

         return sendResponse (
            res,
            200,
            "Profile updated successfully ",
            {user}
         );
    }
 );
}

export const authController = new AuthController();






































































































  
