import { StatusCodes } from 'http-status-codes';
import { test, expect } from 'vitest';

import { TOKEN_TYPE } from '../src/server/middleware/authentication.middleware';
import { testServer } from './test.setup';

const token = TOKEN_TYPE + ' ' + 'akoujsrbdgfpouewbf';

test('User created', async () => {

    const sut = await testServer
        .post('/user')
        .set('Authorization', token)
        .send({ name: 'Eric', age: 35, email: 'eric@test.com' });

    console.log(sut);

    expect(sut.statusCode).toEqual(StatusCodes.CREATED);
    expect(sut.body).toHaveProperty('id');
});

