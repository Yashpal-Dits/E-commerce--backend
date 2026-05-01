import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { sendResponse } from "../utils/response";

export  const errorHandler = (
    err : Error | ApiError,
    _req : Request,
    res : Response,
    _next : NextFunction
) => {
    if( err instanceof ApiError) {
        return sendResponse(
            res, 
            err.statusCode,
            err.message,
            undefined,
            err.errors
        );
    }

    console.error("Any Error:", err);
    return sendResponse(res, 500, " Server Error");
};

export const notFoundHandler = (_req : Request , res : Response, _next : NextFunction) => {
    return sendResponse(res, 404, "Data not found");
}; 