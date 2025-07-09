import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { eachDayOfInterval, isBefore } from 'date-fns';
import { Units } from '@/utils';

export const validation = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    unit: z
      .enum([...Object.values(Units)] as [Units, ...Units[]])
      .default('kilometers'),
  })
  .superRefine(({ endDate: end, startDate: start }, ctx) => {
    if (!start && end) {
      ctx.addIssue({
        path: ['startDate'],
        code: z.ZodIssueCode.custom,
        message: 'Start date is required',
      });
    }

    if (start && end) {
      if (isBefore(end, start)) {
        ctx.addIssue({
          path: ['endDate'],
          code: z.ZodIssueCode.custom,
          message: 'End date cannot be before start date',
        });
      }

      if (eachDayOfInterval({ start, end }).length > 7) {
        ctx.addIssue({
          path: ['endDate'],
          code: z.ZodIssueCode.custom,
          message: 'Date range cannot be more than 7 days',
        });
      }
    }
  });

export const resolver = zodResolver(validation);
