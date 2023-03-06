export type User = {
    id: string;
    name: string;
    age: number;
    email: string;
    password?: string;
};

export type UserRequest = Omit<User, 'id'>;

export type UserResponse = Omit<User, 'password'>;
