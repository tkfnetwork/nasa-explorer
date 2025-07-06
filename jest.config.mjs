/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  coveragePathIgnorePatterns: ["index.ts"],
  coverageReporters: ["lcov", "text", "cobertura"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
