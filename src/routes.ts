import { Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import AuthenticateController from './useCases/authenticate/AuthenticateController';
import { CreateUserController } from './useCases/createUser/CreateUserController';

const router = Router();

const createUserController = new CreateUserController();
const authenticate = new AuthenticateController();

router.post('/users', createUserController.handle)
router.post('/login', authenticate.handle)

router.get("/courses", ensureAuthenticated, (req, res) => {
    return res.json([
        {id: 1, name: "NodeJS"},
        {id: 2, name: "ReactJS"},
        {id: 3, name: "NextJS"},
    ])
})

export default router;