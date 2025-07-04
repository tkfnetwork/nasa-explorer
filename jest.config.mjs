/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['index.ts'],
  coverageReporters: ['lcov', 'text', 'cobertura'],
  coverageThreshold: {
    // TODO: reenable should productionising continue
    // global: {
    //   branches: 80,
    //   functions: 70,
    //   lines: 80,
    //   statements: -20,
    // },
  },
};
