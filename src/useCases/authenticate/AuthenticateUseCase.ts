import { client } from "../../prisma/client";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
require('dotenv').config()

interface IRequest {
    username: string;
    password: string;
}

class AuthenticateUseCase {

    async execute({username, password}: IRequest) {
        const userExists = await client.user.findFirst({
            where: {
                username
            }
        });
        if(!userExists){
            return ({status:"Error",message: "username or password is incorrect"})
        }

        const passwordMatch = await compare(password, userExists.password)
        
        if(!passwordMatch){
            return ({status:"Error",message: "username or password is incorrect"})
        }
        const token = sign({}, process.env.TOKEN_KEY, {
            subject: userExists.id,
            expiresIn: "20s"
        });

        return { token };
    }
}

export default AuthenticateUseCase;