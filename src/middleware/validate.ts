
import { Request, Response , NextFunction } from 'express';
import { ValidationError } from '../utils/errors.js';
import { ZodType, ZodError } from 'zod';
export const validate = (schema: ZodType<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new ValidationError("Validation failed", error.issues));
      }
      next(error);
    }
  };