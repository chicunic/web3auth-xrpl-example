import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig({
  files: ['src/**/*.{ts,tsx}'],
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    reactHooks.configs.flat['recommended-latest'],
    reactRefresh.configs.vite,
    eslintConfigPrettier,
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'object-shorthand': ['error', 'always'],
    '@typescript-eslint/unbound-method': 'off',
  },
});
