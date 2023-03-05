export type User = {
    id: string;
    name: string;
    age: number;
    email: string;
    password?: string;
};

export type UserBody = Omit<User, 'id'>;
