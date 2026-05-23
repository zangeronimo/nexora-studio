module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },

  testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/*.(test|spec).(ts|tsx)'],

  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
