import { UserRequest, UserResponse } from '../../models';
import { IUsersRepository } from './users.repository';

export class UserCase {

    constructor(private readonly repository: IUsersRepository) {}

    public list (filter = '', page = 1, limit = 100): Promise<UserResponse[]> {
        return this.repository.list(filter, page, limit);
    }

    public getById (id: string): Promise<UserResponse | null> {
        return this.repository.getById(id);
    }

    public create (user: Omit<UserRequest, 'id'>): Promise<string> {
        return this.repository.create(user);
    }

    public update (id: string, user: Omit<UserRequest, 'id'>): Promise<void> {
        return this.repository.update(id, user);
    }

    public deleteById (id: string): Promise<void> {
        return this.repository.deleteById(id);
    }
}
