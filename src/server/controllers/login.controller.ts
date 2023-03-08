import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { UserCase } from '../../cases';
import { JwtHelper } from '../../helpers';
import { LoginRequestDTO, AuthenticatedUserDTO } from '../../models';
import { UserPrismaRepository } from '../../repositories';
import { LoginError, ValidationMiddleware } from '../middleware';

const getUC = () => {
    const repo = new UserPrismaRepository();
    return new UserCase(repo);
};

const LoginSchema: z.ZodType<LoginRequestDTO> = z.object({
    email: z.string().email(),
    password: z.string()
});

export const loginValidator = ValidationMiddleware.validation({ body: LoginSchema });

export const login = async (req: Request<{}, {}, LoginRequestDTO>, res: Response) => {
    const user = await getUC().getByEmailAndPassword(req.body.email, req.body.password);
    if (!user) throw new LoginError();

    const authenticatedUser: AuthenticatedUserDTO = { id: user.id, token: JwtHelper.sign(user) };
    return res.status(StatusCodes.OK).send(authenticatedUser);
};
