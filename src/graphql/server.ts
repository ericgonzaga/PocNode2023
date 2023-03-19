import path from 'path';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UsersResolver } from './resolvers';

export async function bootstrap(port: number): Promise<ServerInfo> {
    const schema = await buildSchema({
        resolvers: [UsersResolver],
        emitSchemaFile: path.resolve(__dirname, '../../schema.gql'),
    });

    return new ApolloServer({ schema }).listen({ port });
}
