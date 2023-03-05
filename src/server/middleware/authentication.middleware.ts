import { RequestHandler } from 'express';
import { UserNotAuthenticatedError } from './api-error.type';

export const test: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new UserNotAuthenticatedError();
    }

    const [ type, token ] = authorization.split(' ');
    if (type !== 'Bearer') {
        throw new UserNotAuthenticatedError();
    }

    // TODO: teste token-jwt

    return next();
};
