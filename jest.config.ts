module.exports = {
  clearMocks: false,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: ['src/**/{!(main.ts),}.ts'],
  coveragePathIgnorePatterns: [
    'dist/',
    'node_modules/',
    '__mocks__/',
    '__tests__/'
  ],
  verbose: true
};
