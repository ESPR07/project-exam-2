import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handle CSS imports
    '^@/(.*)$': '<rootDir>/src/$1', // Alias for src directory
  },
};

export default config;