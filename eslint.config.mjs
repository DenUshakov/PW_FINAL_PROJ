// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],

    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // Playwright rules only for tests
  {
    files: ['tests/**/*.{js,ts}'],

    extends: [
      playwright.configs['flat/recommended'],
    ],

    rules: {
      // Playwright-specific custom rules
      // 'playwright/no-skipped-test': 'error',
    },
  },
]);