import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  // =========================================================
  // BASE JS + TS
  // =========================================================
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // =========================================================
  // FRONTEND (REACT + TYPESCRIPT)
  // =========================================================
  {
    files: ['src/**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      sonarjs,
      import: importPlugin,
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
      // =====================================================
      // ARCHITECTURE RULES (NEXORA)
      // =====================================================
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@application/*', '@infra/*', '@presentation/*'],
              message: 'domain layer cannot depend on upper layers',
            },
            {
              group: ['@presentation/*'],
              message: 'application layer cannot depend on presentation',
            },
            {
              group: ['@infra/*'],
              message: 'presentation cannot depend directly on infra',
            },
            {
              group: ['@domain/*'],
              message:
                'presentation should access domain via application layer',
            },
          ],
        },
      ],

      // =====================================================
      // REACT
      // =====================================================
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react/no-children-prop': 'off',

      // =====================================================
      // TYPESCRIPT
      // =====================================================
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',

      // =====================================================
      // JS CORE
      // =====================================================
      'no-use-before-define': 'off',

      // =====================================================
      // IMPORTS
      // =====================================================
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

      // =====================================================
      // SONARJS
      // =====================================================
      ...sonarjs.configs.recommended.rules,
    },
  },

  // =========================================================
  // NODE TOOLING (WEBPACK / JEST / COMMITLINT)
  // =========================================================
  {
    files: [
      '**/webpack*.js',
      '**/*.config.js',
      'jest.config.js',
      'commitlint.config.js',
    ],

    languageOptions: {
      globals: {
        ...globals.node,
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },
];
