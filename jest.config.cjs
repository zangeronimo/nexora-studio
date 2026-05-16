module.exports = {
  preset: 'ts-jest/presets/default',

  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],

  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/*.(test|spec).(ts|tsx)'],

  moduleFileExtensions: ['ts', 'tsx', 'js'],

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
};
