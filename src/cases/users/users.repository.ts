import { UserRequestDTO, UserResponseDTO } from '../../models';

export interface IUsersRepository {

    list(filter?: string, page?: number, limit?: number): Promise<UserResponseDTO[]>;
    getById(id: string): Promise<UserResponseDTO | null>;
    create(user: UserRequestDTO): Promise<UserResponseDTO>;
    update(id: string, user: UserRequestDTO): Promise<void>;
    deleteById(id: string): Promise<void>;
}
