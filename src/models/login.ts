export type AuthenticatedUserDTO = {
    id: string;
    token: string;
}

export type LoginRequestDTO = {
    email: string;
    password: string;
}
