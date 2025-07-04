import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['prisma/client/', 'docs/', 'build.js', 'dist/'],
  },
  { languageOptions: { globals: { ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-empty': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    plugins: { import: importPlugin },
    rules: {
      'no-empty': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn', // or "error"
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['sibling', 'parent'],
            ['index'],
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
