import { format } from 'date-fns';

export const formatDate = (date?: string | Date) =>
  date
    ? format(typeof date === 'string' ? new Date(date) : date, 'yyyy-MM-dd')
    : undefined;
