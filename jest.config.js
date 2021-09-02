module.exports = {
  verbose: true,
  // testEnvironment: "node",
  setupFilesAfterEnv: ['<rootDir>/test/jest.helpers.js'],
  preset: '@shelf/jest-mongodb',
  modulePathIgnorePatterns: ['<rootDir>/test/(helpers|mocks).js']
};
