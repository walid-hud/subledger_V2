
import { Request, Response , NextFunction } from 'express';
import { ValidationError } from '../utils/errors.js';
import { ZodType, ZodError, object } from 'zod';
export const validate = (schema: ZodType) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      Object.assign(req, result); // Merge validated data into req      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new ValidationError("Validation failed", error.issues));
      }
      next(error);
    }
  };