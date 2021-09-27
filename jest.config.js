module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.(ts|tsx|js|jsx)',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/src/pages/**',
    '!**/src/**/*.(types|constants)',
  ],
  coverageDirectory: '<rootDir>/.coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
  },
};
