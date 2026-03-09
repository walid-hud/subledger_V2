import jwt, { JsonWebTokenError } from "jsonwebtoken";
import {  Result, wrapSync } from "./try.js";
import z from "zod";
import env from "../config/env.js";

export const JwtPayload = z.object({
  userId: z.string(),
  email: z.string(),
  role: z.enum(["user", "admin"]),
});

type IJwtPayload = z.infer<typeof JwtPayload>;

export const generateToken = (payload: IJwtPayload): string => {
  const secret = env.JWT_SECRET_KEY;
  //@ts-ignore   
  const token = jwt.sign(payload, secret, {
    expiresIn: env.JWT_EXPIRES_IN,
    algorithm: "HS256",
  });
  return token;
};

export const verifyToken = (token: string): Result<IJwtPayload> => {
  const secret = env.JWT_SECRET_KEY;
  const [decoded, error] = wrapSync(() => jwt.verify(token, secret) as IJwtPayload);
  if(error) return [null , error]
  return [decoded , null]
};

