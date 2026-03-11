import env from "../config/env.js";
import jwt from "jsonwebtoken"
import { UnauthorizedError, ValidationError } from "../utils/errors.js";
import { ZodType } from "zod";


export const varifyToken = (token:string)=>{
    jwt.verify(token , env.JWT_SECRET_KEY , (err , decoded)=>{
        if(err){
            throw new UnauthorizedError("Invalid credentials")
        }
        return decoded
    })
}

export const validateToken = (token:string , schema:ZodType)=>{
    const {success ,data } = schema.safeParse(token)
    if(!success){
        throw new ValidationError("invalid token data")
    }
    return data
} 


export const generateToken = (payload:string|object)=>{
    // @ts-ignore because expiresIn expects number | ms.StringValue | undefined
    // but we have it as a plain string in env
    const token = jwt.sign(payload , env.JWT_SECRET_KEY , {
        expiresIn:env.JWT_EXPIRES_IN 
    })
    return token
}
