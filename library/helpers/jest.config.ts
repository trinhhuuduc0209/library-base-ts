import type { Config } from '@jest/types';

export default (): Config.InitialOptions => {
  return {
    verbose: true,
    preset: 'ts-jest/presets/js-with-ts',
    rootDir: process.cwd(),
    roots: ['<rootDir>/src'],
    testEnvironment: '@happy-dom/jest-environment',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    passWithNoTests: true,
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    globals: {
      'ts-jest': {
        tsConfig: '<rootDir>/tsconfig.json',
      },
    },
  };
};
