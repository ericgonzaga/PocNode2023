import { z } from 'zod';

const GREATER_THAN_0 = 'Must be greater than 0';

export type IFilterProps = {
    filter?: string;
    page: number;
    limit: number;
}

export const FilterSchema: z.ZodType<IFilterProps> = z.object ({
    filter: z.string().optional(),
    page: z.string().default('1').transform(Number).refine(x => x >= 1, { message: GREATER_THAN_0 }),
    limit: z.string().default('100').transform(Number).refine(x => x >= 1, { message: GREATER_THAN_0 })
});

export type IIdProps = {
    id: string;
}

export const IdSchema: z.ZodType<IIdProps> = z.object({
    id: z.string().min(3)
});
