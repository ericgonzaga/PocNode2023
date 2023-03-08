import 'express-async-errors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { usersRouter, loginRouter } from './routers';
import { ErrorMiddleware } from './middleware';

const server = express();
server.use(express.json());

const version = process.env.npm_package_version;

server.get('/', (req, res) => {
    return res.redirect('/info');
});

server.get('/info', (req, res) => {
    return res.status(StatusCodes.OK).send(`Version ${version}`);
});

server.use('/user', usersRouter);
server.use('/login', loginRouter);

server.use(ErrorMiddleware.middleware);

export { server };

