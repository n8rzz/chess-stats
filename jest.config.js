module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.(ts|tsx|js|jsx)', '!**/coverage/**', '!**/node_modules/**'],
  coverageDirectory: '<rootDir>/.coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  preset: 'ts-jest',
  // reporters: [['jest-simple-dot-reporter', { color: true }]],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  verbose: true,
};
