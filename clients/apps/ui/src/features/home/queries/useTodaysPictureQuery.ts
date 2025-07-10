import { apiClient } from '@/api/client';
import { getTodaysPictureOptions } from '@/api/generated/@tanstack/react-query.gen';
import { useQuery } from '@tanstack/react-query';

export const useTodaysPictureQuery = () =>
  useQuery({
    ...getTodaysPictureOptions({ client: apiClient }),
  });
