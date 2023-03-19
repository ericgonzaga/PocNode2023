export type AuthenticatedUserDTO = {
    userId: string;
    token: string;
};

export type LoginRequestDTO = {
    email: string;
    password: string;
};
