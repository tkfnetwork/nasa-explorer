import baseConfig from '../../../jest.config.mjs';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  ...baseConfig,
  setupFilesAfterEnv: [
    ...(baseConfig.setupFilesAfterEnv ?? []),
    'jest-axe/extend-expect',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ...(baseConfig.moduleNameMapper ?? {}),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^@/(.*)$.*': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['index.ts'],
  coverageReporters: ['lcov', 'text', 'cobertura'],
};
