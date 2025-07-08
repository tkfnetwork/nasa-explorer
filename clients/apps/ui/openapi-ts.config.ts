import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../../../services/apps/api/src/features/docs/openapi-spec.json',
  output: 'src/api/generated',
  plugins: ['@tanstack/react-query'],
});
