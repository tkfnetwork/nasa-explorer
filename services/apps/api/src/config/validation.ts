import { z } from 'zod';

export const envValidation = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  API_PORT: z.coerce
    .number({
      description: 'API service port',
    })
    .default(3008),
  LOG_LEVEL: z
    .enum(['info', 'debug', 'warn', 'error'])
    .optional()
    .default('info'),
  NASA_API_KEY: z.string().min(5),
});
