import { getAsteroidsOptions } from '@/api/generated/@tanstack/react-query.gen';
import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';

export type UseAsteroidsOptions = {
  startDate?: Date;
  endDate?: Date;
};

export const useAsteroidsQuery = ({
  startDate,
  endDate,
}: UseAsteroidsOptions = {}) =>
  useQuery({
    ...getAsteroidsOptions({
      client: apiClient,
      query: {
        startDate:
          typeof startDate === 'string' ? startDate : startDate?.toISOString(),
        endDate: typeof endDate === 'string' ? endDate : endDate?.toISOString(),
      },
    }),
  });
