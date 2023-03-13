import { Length, Min } from 'class-validator';
import { Arg, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from 'type-graphql';

import { getUsersUseCase } from '../../adapters';

@InputType()
export class UserInput {
    @Field(() => String) @Length(3, 255) name: string;
    @Field(() => Int) @Min(0) age: number;
    @Field(() => String) email: string;
    @Field(() => String, { nullable: true }) password: string;
}

@ObjectType()
export class UserOutput {
    @Field(() => String) id: string;
    @Field(() => String) name: string;
    @Field(() => Int) age: number;
    @Field(() => String) email: string;
    @Field(() => String) active: boolean;
}

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
}
