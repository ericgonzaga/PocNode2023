import { randomUUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { expect, describe, it } from 'vitest';

import { AuthenticationMiddleware } from '../src/server/middleware';
import { testServer } from './test.setup';

const token = AuthenticationMiddleware.TOKEN_TYPE + ' ' + 'akoujsrbdgfpouewbf';
let userId = '';

describe('Create User', () => {
    it('Default flow', async () => {
        const randomName = randomUUID();

        const sut = await testServer
            .post('/user')
            .set('Authorization', token)
            .send({ name: randomName, age: 35, email: `${randomName}@test.com` });

        expect(sut.statusCode).toEqual(StatusCodes.CREATED);
        expect(sut.body).toHaveProperty('id');

        userId = sut.body.id;
    });
});

describe('Select User', () => {
    it('Default flow', async () => {
        const sut = await testServer.get(`/user/${userId}`);

        expect(sut.statusCode).toEqual(StatusCodes.OK);
        expect(sut.body).toHaveProperty('id');
        expect(sut.body.id).toEqual(userId);
    });
});


describe('Update User', () => {
    it('Default flow', async () => {
        const randomName = randomUUID();

        const sut = await testServer
            .put(`/user/${userId}`)
            .set('Authorization', token)
            .send({ name: randomName, age: 35, email: `${randomName}@test.com` });

        expect(sut.statusCode).toEqual(StatusCodes.OK);
    });
});

describe('Delete User', () => {
    it('Default flow', async () =>{
        const sut = await testServer.delete(`/user/${userId}`).set('Authorization', token);

        expect(sut.statusCode).toEqual(StatusCodes.OK);
    });
});
