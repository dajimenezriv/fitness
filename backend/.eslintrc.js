module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'prettier',
  ],
  rules: {
    indent: 'off',
    'import/no-import-module-exports': 'off',
    'max-len': ['error', { code: 140 }],
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
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
  },
  settings: {
    'import/resolver': {
      node: {
        typescript: {},
      },
    },
  },
  ignorePatterns: ['.eslintrc.js'],
};
