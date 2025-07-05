import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SafeParseReturnType } from 'zod';
import { ValidationConfig, ValidationContext, ValidationSchema } from './types';

/**
 * Validate any or all of the given contexts in the request e.g.
 *
 * ```ts
 * validate({
 *   params: z.object(...),
 *   query: z.object(...),
 *   body: z.object(...)
 * })
 * ```
 *
 * @param schema
 * @param contexts
 * @param config
 */
export const validate =
  (validations: ValidationSchema, config?: ValidationConfig) =>
  (req: Request, res: Response, next: NextFunction) => {
    const {
      log,
      failThrough,
      statusCode = StatusCodes.BAD_REQUEST,
    } = config ?? {};

    const results = Object.entries(validations).map(([context, schema]) => {
      const data = req?.[context as ValidationContext] ?? {};
      const result = schema.safeParse(data);

      if (log) {
        log(result, context as ValidationContext, schema);
      }

      return [context, result];
    }) as [string, SafeParseReturnType<any, any>][];

    if (results.every(([, result]) => result.success) || failThrough) {
      results.forEach(([context, result]) => {
        req[context as ValidationContext] = result.data;
      });

      return next();
    }

    res.status(statusCode).json({
      error: Object.fromEntries(
        results
          .filter(([, result]) => !result?.success)
          .map(([context, result]) => [
            context,
            result.success ? [] : Object.values(result.error.flatten()).flat(),
          ])
      ),
    });
  };
