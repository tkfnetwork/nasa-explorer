import { format } from 'date-fns';

import { DateFormat } from './constants';

export const formatDate = (date: number | string | Date, template: string) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return format(dateObj, template);
};

export const formatLocalizedLong = (date: number | string | Date) =>
  formatDate(date, DateFormat.LOCALIZED_FULL);

export const formatLocalizedShort = (date: number | string | Date) =>
  formatDate(date, DateFormat.LOCALIZED_SHORT);
