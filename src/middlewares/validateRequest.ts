import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ApiError } from "../utils/ApiError";


export const validateRequest =
  (
    schema: ObjectSchema, 
    source: "body" | "params" | "query" = "body" 
  ) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
    
      const { error, value } = schema.validate(req[source], {
        abortEarly: false, 
        stripUnknown: true,
      });

    
      if (error) {
    
        const errors = error.details.map((detail) => ({
          field: detail.path.join("."), 
          message: detail.message,        
        }));
        throw new ApiError(400, "Validation failed", errors);
      }

      
      req[source] = value;
    
    
      next();
    } catch (err) {
    
      next(err);
    }
  };