import {Response} from "express";

 export interface ApiResponse<T = any> {
    success : boolean;
    message: string;
    data? : T;
    error? : any[];
 }

 export const sendResponse = <T> (
     res : Response,
     statusCode : number,
     message: string,
     data? : T,
     errors ? : any[]
 ): Response => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        ...(data && {data}),
        ...(errors && {errors}),
    });
}
