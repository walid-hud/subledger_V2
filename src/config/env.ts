import z from "zod";
import { config } from "dotenv";

/*
  we use zod to validate the environment variables 
  and provide type safety before we use them in our application.
  preventing runtime errors due to missing or invalid environment variables.
*/

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string().default("1h"),
});
export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  config();
  const { success, data, error } = envSchema.safeParse(process.env);
  if (!success) {
    console.error("Invalid environment variables", z.treeifyError(error));
    process.exit(1);
  }
  return data;
}

const env = loadEnv();
export default env;
