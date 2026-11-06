import tsParser from '@typescript-eslint/parser';
import nextConfig from 'eslint-config-next/core-web-vitals';

export default [
  ...nextConfig,
  { ignores: ['.next/**', 'node_modules/**'] },
  {
    files: ['eslint.config.mjs', 'postcss.config.mjs'],
    rules: { 'import/no-anonymous-default-export': 'off' },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: { 'no-unused-vars': 'off' },
  },
  { files: ['**/*.{js,mjs,cjs}'], rules: { 'no-unused-vars': 'warn' } },
];
