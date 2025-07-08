import { getAsteroidsOptions } from '@/api/generated/@tanstack/react-query.gen';
import { apiClient } from '@/api/client';
import { useQuery } from '@tanstack/react-query';

export type UseAsteroidsOptions = {
  startDate?: Date;
  endDate?: Date;
};

export const useAsteroids = ({
  startDate,
  endDate,
}: UseAsteroidsOptions = {}) =>
  useQuery({
    ...getAsteroidsOptions({
      client: apiClient,
      query: {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      },
    }),
  });
