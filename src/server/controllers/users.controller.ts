import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { UserCase } from '../../cases/users/users.case';
import { UserRequestDTO } from '../../models';
import { UserPrismaRepository } from '../../repositories/user.prisma.repository';
import { IFilterProps } from '../middleware';
import { ValidationMiddleware } from '../middleware';
import { IdSchema } from '../middleware/validation.types';

const getUC = () => {
    const repo = new UserPrismaRepository();
    return new UserCase(repo);
};

export const list = async (req: Request<{}, {}, {}, IFilterProps>, res: Response) => {
    const { filter, page, limit } = req.query;
    const list = await getUC().list(filter, page, limit);
    return res.status(StatusCodes.OK).json(list);
};

export const getById = async (req: Request, res: Response) => {
    const user = await getUC().getById(req.params.id);
    return res.status(StatusCodes.OK).json(user);
};

//==============================================================

const UserBodySchema: z.ZodType<UserRequestDTO> = z.object({
    name: z.string().min(3),
    age: z.number().min(0),
    email: z.string().email(),
    password: z.string().optional()
});

export const createValidator = ValidationMiddleware.validation({ body: UserBodySchema });

export const create = async (req: Request<{}, {}, UserRequestDTO>, res: Response) => {
    const user = await getUC().create(req.body);
    return res.status(StatusCodes.CREATED).send(user);
};

export const updateValidator = ValidationMiddleware.validation({ body: UserBodySchema, params: IdSchema });

export const update = async (req: Request<any, {}, UserRequestDTO>, res: Response) => {
    await getUC().update(req.params.id, req.body);
    return res.status(StatusCodes.OK).send();
};

//==============================================================

export const deleteById = async (req: Request, res: Response) => {
    await getUC().update(req.params.id, req.body);
    return res.status(StatusCodes.OK).send();
};
