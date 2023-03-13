import 'reflect-metadata';

import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'node:crypto';

const gqlUsers = gql`
    type User {
        id: String!,
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name: String): User!
    }
`;

type User = {
    id: string,
    name: string
}

const users: User[] = [];

export const graphql_server = new ApolloServer({
    typeDefs: [ gqlUsers ],
    resolvers: {
        Query: {
            users: () => { return users; },
        },

        Mutation: {
            createUser: (parent, args, ctx) => {
                const user = {
                    id: randomUUID(),
                    name: args.name
                };

                users.push(user);
                return user;
            }
        }

    }
});
