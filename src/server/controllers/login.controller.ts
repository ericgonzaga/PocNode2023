import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { getUsersUseCase } from '../../adapters';
import { JwtHelper } from '../../helpers';
import { LoginRequestDTO, AuthenticatedUserDTO } from '../../models';
import { LoginError, ValidationMiddleware } from '../middleware';

const LoginSchema: z.ZodType<LoginRequestDTO> = z.object({
    email: z.string().email(),
    password: z.string()
});

export const loginValidator = ValidationMiddleware.validation({ body: LoginSchema });

export const login = async (req: Request<{}, {}, LoginRequestDTO>, res: Response) => {
    const user = await getUsersUseCase().getByEmailAndPassword(req.body.email, req.body.password);
    if (!user) throw new LoginError();

    const authenticatedUser: AuthenticatedUserDTO = { id: user.id, token: JwtHelper.sign(user) };
    return res.status(StatusCodes.OK).send(authenticatedUser);
};
