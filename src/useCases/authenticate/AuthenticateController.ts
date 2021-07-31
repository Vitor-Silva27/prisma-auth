import { Response, Request } from "express";
import AuthenticateUseCase from "./AuthenticateUseCase";

class AuthenticateController {
    async handle(req: Request, res: Response){
        const { username, password } = req.body;

        const auth = new AuthenticateUseCase();

        const token = await auth.execute({
            username,
            password
        })

        return res.json(token);
    }
}

export default AuthenticateController;