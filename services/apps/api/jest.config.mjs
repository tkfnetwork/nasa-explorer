import baseConfig from '../../../jest.config.mjs';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  ...baseConfig,
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.ts',
    ...(baseConfig.setupFilesAfterEnv ?? []),
  ],
};
