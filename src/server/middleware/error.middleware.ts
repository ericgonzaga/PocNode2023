import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from './error.types';

export const middleware = (err: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(status).json({
        status,
        message: err.message,
    });
};
