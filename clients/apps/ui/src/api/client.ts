import { API_BASE_URL } from '@/config';
import { createClient } from './generated/client';

export const apiClient = createClient({
  baseUrl: API_BASE_URL,
});
