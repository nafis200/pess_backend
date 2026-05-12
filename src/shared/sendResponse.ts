<<<<<<< HEAD
import { Response } from "express"

const sendResponse = <T>(res: Response, jsonData: {
    success: boolean,
    status: number,
    message: string,
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    data?: T | null | undefined
}) => {
    res.status(jsonData.status).json({
        success: jsonData.success,
        status: jsonData.status,
        message: jsonData.message,
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined
    })
};

=======
import { Response } from "express";

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

const sendResponse = <T>(
  res: Response,
  jsonData: {
    success: boolean;
    status: number;
    message: string;
    meta?: TMeta; 
    data?: T | null | undefined;
  }
) => {
  res.status(jsonData.status).json({
    success: jsonData.success,
    status: jsonData.status,
    message: jsonData.message,
    meta: jsonData.meta || null || undefined, 
    data: jsonData.data || null || undefined,
  });
};

>>>>>>> 9410afd (pst)
export default sendResponse;