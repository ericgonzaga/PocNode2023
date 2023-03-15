import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { getUsersUseCase } from '../../adapters';
import { UserOutput, UserInput } from '../types';

@Resolver(UserOutput)
export class UsersResolver {

    @Query(() => [UserOutput])
    async users() {
        return getUsersUseCase().list();
    }

    @Mutation(() => UserOutput)
    async createUser(@Arg('data', () => UserInput) data: UserInput) {
        return getUsersUseCase().create({
            name: data.name,
            age: data.age,
            email: data.email,
            password: data.password
        });
    }

    @Mutation()
    async updateUser(@Arg('id', () => String) id: string, @Arg('data', () => UserInput) data: UserInput) {
        return getUsersUseCase().update(id, {
            name: data.name,
            age: data.age,
            email: data.email,
            password: data.password
        });
    }

    @Mutation()
    async deleteUser(@Arg('id', () => String) id: string) {
        return getUsersUseCase().deleteById(id);
    }
}
