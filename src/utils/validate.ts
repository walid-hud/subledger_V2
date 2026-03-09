import { z, ZodType } from 'zod';
import { Result } from './try.js'; 

export function validate<T>(schema: ZodType<T>, data: unknown): Result<T, z.ZodError> {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    return [null, result.error];
  }
  
  return [result.data, null];
}