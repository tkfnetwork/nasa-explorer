import { ZodSchema, z } from 'zod';

export const arrayOf = <Schema extends ZodSchema>(schema: Schema) =>
  z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        return value
          .split(/[,]/g)
          .map((text) => text.trim())
          .filter(Boolean);
      }

      return value;
    },
    z.array(schema).min(1, { message: 'Must have at least 1 item' })
  );

const selectableFieldsRegexValidation = (selectableFields: string[]) =>
  z.union(
    // @ts-expect-error infer error
    selectableFields.map((field) =>
      z
        .string()
        .startsWith(field, `Must be one of '${selectableFields.join(', ')}'`)
    ),
    {
      message: `Must be one of '${selectableFields.join(', ')}'`,
    }
  );

const invalidParamErrorMessage = { message: 'Invalid parameter supplied' };

export const selectableQueryValidation = (selectableFields: string[]) =>
  arrayOf(selectableFieldsRegexValidation(selectableFields)).optional();

export const singleQueryValidation = (selectableFields: string[]) =>
  z
    .object({
      select: selectableQueryValidation(selectableFields),
    })
    .strict(invalidParamErrorMessage);

export const listQueryValidation = (selectableFields: string[]) =>
  z
    .object({
      page: z.coerce.number().optional().default(1),
      limit: z.coerce.number().max(500).optional().default(500),
      select: selectableQueryValidation(selectableFields),
      sort: arrayOf(
        selectableFieldsRegexValidation([
          ...selectableFields,
          ...selectableFields.map((field) => `-${field}`),
        ])
      ).optional(),
      search: z.string().optional(),
    })
    .strict(invalidParamErrorMessage);
