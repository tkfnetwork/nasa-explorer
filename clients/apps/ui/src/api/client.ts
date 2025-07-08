import { createClient } from './generated/client';

export const apiClient = createClient({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});
