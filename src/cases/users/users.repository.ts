import { UserRequestDTO, UserResponseDTO } from '../../models';

export interface IUsersRepository {
    list(filter?: string, page?: number, limit?: number): Promise<UserResponseDTO[]>;
    getById(id: string): Promise<UserResponseDTO | null>;
    getByEmailAndPassword(email: string, password: string): PromiseLike<UserResponseDTO | null>;

    create(user: UserRequestDTO): Promise<UserRequestDTO>;
    update(id: string, user: UserRequestDTO): Promise<void>;
    deleteById(id: string): Promise<void>;
}
