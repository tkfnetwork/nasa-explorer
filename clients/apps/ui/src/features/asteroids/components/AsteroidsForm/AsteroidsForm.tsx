import { formatDate, Units } from '@/utils';
import {
  cn,
  DatePicker,
  Select,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type DatePickerRangeValue,
} from '@ne/components';
import { useTranslation } from '@ne/i18n/react';
import { useDeepCompareMemo } from '@react-hookz/web';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { addDays, eachDayOfInterval, subDays } from 'date-fns';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PiWarning } from 'react-icons/pi';
import { useAsteroidsContext } from '../AsteroidsPage/AsteroidsPage.context';
import type { AsteroidsFormValues } from './AsteroidsForm.types';
import { resolver } from './AsteroidsForm.validation';

export const AsteroidsForm = () => {
  const { t } = useTranslation(['common']);

  const navigate = useNavigate();
  const pathname = useLocation({ select: (state) => state.pathname });

  const { unit, dates } = useAsteroidsContext();

  const { handleSubmit, watch, formState, setValue, control } =
    useForm<AsteroidsFormValues>({
      // @ts-expect-error Resolver doesn't infer default value
      resolver,
      mode: 'all',
      defaultValues: {
        unit,
        startDate: dates?.[0] ?? undefined,
        endDate: dates?.[1] ?? undefined,
      },
    });

  const values = watch();

  const submit = useCallback(() => {
    handleSubmit(async (values) => {
      await navigate({
        to: pathname,
        search: {
          ...values,
          startDate: formatDate(values.startDate),
          endDate: formatDate(values.endDate),
        },
      });
    })();
  }, [handleSubmit, navigate, pathname]);

  // Simulate an "auto-submit"
  useDeepCompareMemo(() => {
    if (formState.isDirty) {
      submit();
    }
  }, [values]);

  const hasErrors = Boolean(Object.keys(formState.errors).length);

  return (
    <form className={cn('flex', 'gap-2', 'items-center')}>
      <DatePicker
        range
        dateFormat="dd/MM/yyyy"
        placeholder={[t('common:startDate'), t('common:endDate')]}
        onChange={(value: DatePickerRangeValue) => {
          const [start, end] = value;

          let nextEnd = end;

          // Ensure the dates are always only 7 days apart inclusive
          if (start && end) {
            const count = eachDayOfInterval({ start, end }).length;
            nextEnd = count > 6 ? addDays(start, 6) : end;
          }

          setValue('startDate', start ?? undefined, {
            shouldDirty: true,
            shouldTouch: true,
          });
          setValue('endDate', nextEnd ?? undefined, {
            shouldDirty: true,
            shouldTouch: true,
          });
        }}
        value={[values.startDate ?? null, values?.endDate ?? null]}
        dismissable
        min={values?.startDate ? subDays(values.startDate, 6) : undefined}
        max={values?.startDate ? addDays(values.startDate, 6) : undefined}
      />
      <Controller
        control={control}
        name="unit"
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            name={name}
            onChange={onChange}
            value={value ?? unit}
            disabled={disabled}
            className={cn('w-48', 'h-full')}
            options={[
              {
                options: Object.values(Units).map((value) => ({
                  label: t(`common:${value}`),
                  value,
                })),
              },
            ]}
          />
        )}
      />

      {hasErrors ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <PiWarning
              title={t('common:validationErrors')}
              className={cn('text-amber-400', 'text-lg')}
            />
          </TooltipTrigger>
          <TooltipContent>
            <ul>
              {Object.entries(formState.errors).map(([field, error]) => (
                <li key={field}>{error.message?.toString()}</li>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </form>
  );
};
