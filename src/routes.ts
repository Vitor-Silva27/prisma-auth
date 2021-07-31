import { response, Router } from 'express'
import AuthenticateController from './useCases/authenticate/AuthenticateController';
import { CreateUserController } from './useCases/createUser/CreateUserController';

const router = Router();

const createUserController = new CreateUserController();
const authenticate = new AuthenticateController();

router.post('/users', createUserController.handle)
router.post('/login', authenticate.handle)


export default router;