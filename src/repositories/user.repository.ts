import { PrismaClient } from '@prisma/client'

import { IUsersRepository } from '../cases/users/users.repository';
import { UserRequest, UserResponse } from '../models';

export class UserPrismaRepository implements IUsersRepository {

    private db: any;

    constructor() {
        this.db = (new PrismaClient()).user;
    }

    async list(filter = '', page = 1, limit = 100): Promise<UserResponse[]> {
        return await this.db.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                OR: { name: filter, email: filter }
            },
            select: { id: true, name: true, age: true, email: true, password: false }
        });
    }

    async getById(id: string): Promise<UserResponse | null> {
        return await this.db.findUnique({
            where: { id },
            select: { id: true, name: true, age: true, email: true, password: false }
        });
    }

    async create(user: UserRequest): Promise<string> {
        const data = await this.db.create({
            data: {
                name: user.name,
                age: user.age,
                email: user.email,
                password: (user.password ?? '')
            },
            select: { id: true },
        });

        return data.id;
    }

    update(id: string, user: UserRequest): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async deleteById(id: string): Promise<void> {
        return this.db.deleteById(id);
    }
}
