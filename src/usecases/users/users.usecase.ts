import { UserRequestDTO, UserResponseDTO } from '../../models';
import { IUsersRepository } from './users.repository';

export class UserUseCase {
    constructor(private readonly repository: IUsersRepository) {}

    public async list(filter = '', page = 1, limit = 100): Promise<UserResponseDTO[]> {
        return await this.repository.list(filter, page, limit);
    }

    public async getById(id: string): Promise<UserResponseDTO | null> {
        return await this.repository.getById(id);
    }

    public async create(user: UserRequestDTO): Promise<UserResponseDTO> {
        return await this.repository.create(user);
    }

    public async update(id: string, user: UserRequestDTO): Promise<void> {
        return await this.repository.update(id, user);
    }

    public async deleteById(id: string): Promise<void> {
        return await this.repository.deleteById(id);
    }

    public async getByEmailAndPassword(email: string, password: string): Promise<UserResponseDTO | null> {
        return await this.repository.getByEmailAndPassword(email, password);
    }
}
