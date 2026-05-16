import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',

      'webpack*.cjs',
      'jest.config.*',
      'commitlint.config.*',
      'dump.js',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        jsx: true,
      },

      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,

        console: 'readonly',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      sonarjs,
      import: importPlugin,
      prettier: prettierPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      // prettier
      'prettier/prettier': 'error',

      // react hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',

      // ts
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // react
      'react/no-children-prop': 'off',

      // js
      'no-use-before-define': 'off',

      // imports
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      // sonar
      ...sonarjs.configs.recommended.rules,
    },
  },

  // =========================
  // DOMAIN
  // =========================

  {
    files: ['src/domain/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@application/*', '@infra/*', '@presentation/*'],
        },
      ],
    },
  },

  // =========================
  // APPLICATION
  // =========================

  {
    files: ['src/application/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@infra/*', '@presentation/*'],
        },
      ],
    },
  },

  // =========================
  // INFRA
  // =========================

  {
    files: ['src/infra/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@presentation/*'],
        },
      ],
    },
  },

  // =========================
  // PRESENTATION
  // =========================

  {
    files: ['src/presentation/**/*.{ts,tsx}'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@infra/*'],
        },
      ],
    },
  },

  prettierConfig,
];
