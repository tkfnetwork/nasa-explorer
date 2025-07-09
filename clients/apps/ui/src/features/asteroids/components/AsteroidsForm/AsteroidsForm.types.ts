import type z from 'zod';
import type { validation } from './AsteroidsForm.validation';

export type AsteroidsFormValues = z.infer<typeof validation>;
