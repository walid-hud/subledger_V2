import z from "zod";

export const UserLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const UserSignUpSchema = z.object({
  body: z.object({
    email: z.string().email(),
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

export const PostSubscriptionsSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    price: z.number().min(0),
    billing_cycle: z.enum(["monthly", "yearly"]),
  }),
});

export const PatchSubscriptionsSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(1).optional(),
      price: z.number().min(0).optional(),
      billing_cycle: z.enum(["monthly", "yearly"]).optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: "At least one field is required",
    }),
});

export const SubscriptionIdParamsSchema = z.object({
  params: z.object({
    subscriptionId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid subscription id"),
  }),
});
