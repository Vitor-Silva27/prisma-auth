import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
require('dotenv').config()

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const [, token] = authToken.split(" ");

    try{
        verify(token, process.env.TOKEN_KEY);

        return next();
    }catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}