module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '.*': 'babel-jest',
    '^.+\\.js?$': 'babel-jest',
  },
};
