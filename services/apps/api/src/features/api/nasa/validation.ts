import z from 'zod';

const startEndDateValidation = z.object({
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
});

export const apodParamsValidation = z
  .object({
    date: z.coerce.date().optional(),
    count: z.coerce.number().optional(),
    thumbs: z.boolean().optional(),
  })
  .and(startEndDateValidation)
  .superRefine((data, ctx) => {
    if (('start_date' in data || 'end_date' in data) && 'date' in data) {
      ctx.addIssue({
        path: ['date'],
        code: z.ZodIssueCode.custom,
        message: "'date' cannot exist when using 'start_date' or 'end_date'",
      });
    }
  });

export const neoParamsValidation = startEndDateValidation;
