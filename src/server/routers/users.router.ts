import { Router } from 'express';
import { UsersController } from '../controllers';
import { AuthenticationMiddleware, ValidationsMiddleware } from '../middleware';

const usersRouter = Router();

usersRouter.get('/', ValidationsMiddleware.filterValidator, UsersController.list);
usersRouter.get('/:id', ValidationsMiddleware.idValidator, UsersController.getById);
usersRouter.post('/', AuthenticationMiddleware.test, UsersController.createValidator, UsersController.create);
usersRouter.put('/:id',  AuthenticationMiddleware.test, UsersController.updateValidator, UsersController.update);
usersRouter.delete('/:id', AuthenticationMiddleware.test, ValidationsMiddleware.idValidator,  UsersController.deleteById);

export { usersRouter };
