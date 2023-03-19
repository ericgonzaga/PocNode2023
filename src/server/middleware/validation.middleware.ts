import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IdSchema, FilterSchema } from './validation.types';

type TProperty = 'header' | 'body' | 'params' | 'query';

type TAllSchemas = Record<TProperty, any>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

/**
 * Generic request handler to be used as middleware to validate some of the parts from the request.
 *
 * E.g.: const validationRequestHandler = validation({ TProperty: schema });
 *
 * TProperties = 'header' | 'body' | 'params' | 'query'
 *
 * @param schemas
 * @returns TValidation is a RequestHandler
 */
export const validation: TValidation = (schemas) => async (req: Request, res: Response, next: NextFunction) => {
    const errorsReturn: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        const field = key as TProperty;

        try {
            schema.parse(req[field], { abortEarly: false });
        } catch (e) {
            const errors = JSON.parse(e.message);
            const validationErrors: Record<string, string> = {};

            errors.forEach((obj) => {
                validationErrors[obj.path[0]] = obj.message;
            });

            errorsReturn[field] = validationErrors;
        }
    });

    return Object.entries(errorsReturn).length === 0 ? next() : res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsReturn });
};

export const filterValidator = validation({ query: FilterSchema });

export const idValidator = validation({ params: IdSchema });
