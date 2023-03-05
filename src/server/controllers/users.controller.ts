import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { UserBody } from '../../models';
import { ValidationsMiddleware } from '../middleware';

export const list = (req: Request, res: Response) => {
    console.log('users list');

    res.json('pessoa list');
};

export const getById = (req: Request, res: Response) => {

};


//==============================================================

const UserBodySchema = z.object({
    name: z.string().min(3),
    age: z.number().min(0),
    email: z.string().email(),
    password: z.string().optional()
});

export const createValidator = (req: Request, res: Response, next: NextFunction) => {
    UserBodySchema.parse(req.body)
};

export const create = (req: Request, res: Response) => {
    return res.status(StatusCodes.CREATED).send('user created');
};

//==============================================================

export const updateValidator = (req: Request, res: Response, next: NextFunction) => {
    ValidationsMiddleware.IdSchema.parse(req.params);
    UserBodySchema.parse(req.body);
};

export const update = (req: Request, res: Response) => {

};

//==============================================================

export const deleteById = (req: Request, res: Response) => {

};
