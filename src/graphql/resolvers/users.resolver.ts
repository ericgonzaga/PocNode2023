import { randomUUID } from 'node:crypto';
import { Length, Min } from 'class-validator';
import { Arg, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from 'type-graphql';

@InputType()
export class UserInput {
    @Field(() => String) @Length(3, 255) name: string;
    @Field(() => Int) @Min(0) age: number;
    @Field(() => String) email: string;
}

@ObjectType()
export class User {
    @Field(() => String) id: string;
    @Field(() => String) name: string;
    @Field(() => Int) age: number;
    @Field(() => String) email: string;
    @Field(() => String) active: boolean;
}

@Resolver(User)
export class UsersResolver {

    _users: User[] = [];

    @Query(() => [User])
    async users() {
        return this._users;
    }

    @Mutation(() => User)
    async createUser(@Arg('data', () => UserInput) data: UserInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            age: data.age,
            email: data.email,
            active: true
        };

        this._users.push(user);
        return user;
    }
}
