import { Router } from 'express';
import { LoginController } from '../controllers';

const loginRouter = Router();

loginRouter.post('/', LoginController.loginValidator, LoginController.login);

export { loginRouter };
