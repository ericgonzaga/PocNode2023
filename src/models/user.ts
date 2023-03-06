export type UserModel = {
    id: string;
    name: string;
    age: number;
    email: string;
    active: boolean,
    password?: string;
};

export type UserRequestDTO = Omit<UserModel, 'id' | 'active'>;

export type UserResponseDTO = Omit<UserModel, 'password'>;
