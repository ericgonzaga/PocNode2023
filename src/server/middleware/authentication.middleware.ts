import { RequestHandler } from 'express';
import { UserNotAuthenticatedError } from './error.types';

export const TOKEN_TYPE = 'Bearer';

export const test: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new UserNotAuthenticatedError();
    }

    const [type, token] = authorization.split(' ');
    if (type !== TOKEN_TYPE) {
        throw new UserNotAuthenticatedError();
    }

    // TODO: test if token-jwt is valid

    return next();
};
