import { UserCase } from '../cases';
import { UserPrismaRepository } from '../repositories';

export const getUsersUseCase = () => {
    const repo = new UserPrismaRepository();
    return new UserCase(repo);
};
