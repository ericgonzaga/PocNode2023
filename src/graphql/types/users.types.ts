import { Length, Min } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

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
