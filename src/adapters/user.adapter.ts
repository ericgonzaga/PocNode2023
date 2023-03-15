import { UserUseCase } from '../usecases';
import { PrismaRepositories } from '../repositories';

export const getUsersUseCase = () => {
    const repo = new PrismaRepositories.UserPrismaRepository();
    return new UserUseCase(repo);
};
