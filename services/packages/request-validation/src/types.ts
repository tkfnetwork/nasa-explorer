import { SafeParseReturnType, ZodSchema } from 'zod';

export const ValidationContext = ['query', 'body', 'params'] as const;
export type ValidationContext = (typeof ValidationContext)[number];

export type ValidationConfig = {
  /**
   * Change the returned status code
   *
   * @default 400
   */
  statusCode?: number;

  /**
   * Even if there are errors, continue on to the
   * next handler and don't respond
   */
  failThrough?: boolean;

  /**
   * Log the result to an external service
   *
   * @param result
   * @param context
   * @param schema
   */
  log: (
    result: SafeParseReturnType<unknown, unknown>,
    context: ValidationContext,
    schema: ZodSchema
  ) => void | Promise<void>;
};

export type ValidationSchema = Partial<Record<ValidationContext, ZodSchema>>;
