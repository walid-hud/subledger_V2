import z from "zod";

export const UserLoginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export const UserSignUpSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]),
    username: z.string().min(6).max(50),
  }),
});



export const JwtUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.enum(["user", "admin"]),
});


