import supertest from 'supertest';
import { defineConfig } from 'vitest/config';
import { server } from '../src/server/server';

export default defineConfig({
    test: {
        // ...
    },
});

export const testServer = supertest(server);
