import env from "../config/env.js";
import jwt from "jsonwebtoken"
import { UnauthorizedError, ValidationError } from "../utils/errors.js";
import z , { ZodType } from "zod";


export const verifyToken = (token:string)=>{
    try {
        return jwt.verify(token, env.JWT_SECRET_KEY)
    } catch {
        throw new UnauthorizedError("Invalid credentials")
    }
}

export const validateToken = <T extends ZodType>(payload: unknown, schema:T): z.infer<T>=>{
    const {success ,data } = schema.safeParse(payload)
    if(!success){
        throw new ValidationError("invalid token data")
    }
    return data
} 


export const generateToken = (payload:string|object)=>{
    // @ts-ignore because expiresIn expects number | ms.StringValue | undefined
    // but we have it as a plain string in env
    const token = jwt.sign(payload , env.JWT_SECRET_KEY , {
        expiresIn:"1m" // 1 minute for testing purposes
    })
    return token
}
