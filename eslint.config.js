import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.config(require('./.eslintrc.js')),
];
