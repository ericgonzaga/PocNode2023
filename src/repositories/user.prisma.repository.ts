import { PrismaClient } from '@prisma/client';

import { IUsersRepository } from '../cases';
import { UserRequestDTO, UserResponseDTO } from '../models';

export class UserPrismaRepository implements IUsersRepository {

    private db = (new PrismaClient()).user;

    async list(filter = '', page = 1, limit = 100): Promise<UserResponseDTO[]> {
        return await this.db.findMany({
            select: {
                id: true,
                name: true,
                age: true,
                email: true,
                active: true,
                password: false
            },
            where: {
                OR: { name: filter, email: filter },
            },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async getById(id: string): Promise<UserResponseDTO | null> {
        return await this.db.findUnique({
            select: {
                id: true,
                name: true,
                age: true,
                email: true,
                active: true,
                password: false
            },
            where: { id: id },
        });
    }

    async create(user: UserRequestDTO): Promise<UserResponseDTO> {
        return await this.db.create({
            data: {
                name: user.name,
                age: user.age,
                email: user.email,
                password: user.password ?? '',
            },
            select: {
                id: true,
                name: true,
                age: true,
                email: true,
                active: true,
                password: false,
            }
        });
    }

    async update(id: string, user: UserRequestDTO): Promise<void> {
        await this.db.update({
            data: {
                name: user.name,
                age: user.age,
                email: user.email
            },
            where: { id: id },
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.db.delete({ where: { id: id } });
    }

    async getByEmailAndPassword(email: string, password: string): Promise<UserResponseDTO | null> {
        return await this.db.findFirst({
            select: {
                id: true,
                name: true,
                age: true,
                email: true,
                password: false,
                active: true,
            },
            where: {
                email: email,
                password: password,
                active: true
            },
        });
    }
}
