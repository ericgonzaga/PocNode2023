import supertest from 'supertest';
import { defineConfig } from 'vitest/config';
import { server } from '../src/server/server';

export default defineConfig({
    test: {
        // ...
    },
});

// TODO: colocar o banco de teste para ser em memoria.

export const testServer = supertest(server);
