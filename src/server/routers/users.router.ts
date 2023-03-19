import { Router } from 'express';
import { UsersController } from '../controllers';
import { AuthenticationMiddleware, ValidationMiddleware } from '../middleware';

const usersRouter = Router();

usersRouter.get('/', ValidationMiddleware.filterValidator, UsersController.list);
usersRouter.get('/:id', ValidationMiddleware.idValidator, UsersController.getById);
usersRouter.post('/', AuthenticationMiddleware.test, UsersController.createValidator, UsersController.create);
usersRouter.put('/:id', AuthenticationMiddleware.test, UsersController.updateValidator, UsersController.update);
usersRouter.delete('/:id', AuthenticationMiddleware.test, ValidationMiddleware.idValidator, UsersController.deleteById);

export { usersRouter };
