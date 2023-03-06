import { UserRequest, UserResponse } from '../../models';

export interface IUsersRepository {

    list(filter?: string, page?: number, limit?: number): Promise<UserResponse[]>;
    getById(id: string): Promise<UserResponse | null>;
    create(user: UserRequest): Promise<string>;
    update(id: string, user: UserRequest): Promise<void>;
    deleteById(id: string): Promise<void>;
}
