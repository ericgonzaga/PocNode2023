import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
    public readonly status: StatusCodes;

    constructor(message: string, status: StatusCodes) {
        super(message);
        this.status = status;
    }
}

export class UserNotAuthenticatedError extends ApiError {
    constructor() {
        super('User not authenticated', StatusCodes.UNAUTHORIZED);
    }
}

export class LoginError extends ApiError {
    constructor() {
        super('User/password not found', StatusCodes.NOT_FOUND);
    }
}
