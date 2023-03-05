import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const FilterSchema = z.object ({
    filter: z.string().optional(),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).default(100)
});

export const filterValidator = (req: Request, res: Response, next: NextFunction) => {
    FilterSchema.parse(req.query);
    return next();
};

export const IdSchema = z.object({
    id: z.string().min(3)
});

export const idValidator = (req: Request, res: Response, next: NextFunction) => {
    IdSchema.parse(req.params);
    return next();
};
