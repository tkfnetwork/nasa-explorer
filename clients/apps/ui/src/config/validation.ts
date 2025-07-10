import { z } from 'zod';

export const envValidation = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  VITE_API_BASE_URL: z.string().url(),
});
