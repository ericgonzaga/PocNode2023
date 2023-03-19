import * as jwt from 'jsonwebtoken';
import { UserResponseDTO } from '../models';

export const JWT_SECRET_NOT_FOUND_ERROR = 'JWT_SECRET_NOT_FOUND';
export const INVALID_TOKEN_ERROR = 'INVALID_TOKEN';

export const sign = (data: UserResponseDTO) => {
    if (!process.env.JWT_SECRET) return JWT_SECRET_NOT_FOUND_ERROR;

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const verify = (token: string) => {
    if (!process.env.JWT_SECRET) return JWT_SECRET_NOT_FOUND_ERROR;

    try {
        return jwt.verify(token, process.env.JWT_SECRET) as UserResponseDTO;
    } catch (error) {
        return INVALID_TOKEN_ERROR;
    }
};
