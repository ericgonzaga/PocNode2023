// import { server } from './server';
import { bootstrap } from './graphql';

import 'dotenv/config';

// const express_port = process.env.EXPRESS_PORT || 4000;
// server.listen(express_port, () => {
//     console.log(`Server running at http://localhost:${express_port}`);
// });

const gql_port = process.env.GQL_PORT ? Number(process.env.GQL_PORT) : 4001;
bootstrap(gql_port).then(({ url }) => {
    console.log(`GraphQL server running at ${url}`);
});
