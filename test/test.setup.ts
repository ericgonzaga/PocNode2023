import supertest from 'supertest';
import { defineConfig } from 'vitest/config';
import { server } from '../src/server/server';

export default defineConfig({
    test: {
        // ...
    },
});

// TODO: create an in-memory database to be used for tests.

export const testServer = supertest(server);
