import { eachDayOfInterval } from 'date-fns';
import z from 'zod';

export const getAllQueryValidation = z
  .object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  })
  .superRefine(({ startDate: start, endDate: end }, ctx) => {
    if (start && end && eachDayOfInterval({ start, end }).length > 7) {
      ctx.addIssue({
        path: ['endDate'],
        code: z.ZodIssueCode.custom,
        message: 'Date range cannot be more than 7 days',
      });
    }
  });

export const wsPositionsValidation = z.array(z.string());
