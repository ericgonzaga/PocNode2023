import { compare, genSalt, hash } from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const randomSalt = await genSalt(8);
    return await hash(password, randomSalt);
};

export const comperePassword = async (password: string, hash: string) => {
    return await compare(password, hash);
};
