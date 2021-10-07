module.exports = {
  extends: ['airbnb/base', 'prettier', 'react-app'],
  plugins: ['eslint-plugin-prettier'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': 1,
    'arrow-body-style': 1,
    eqeqeq: ['error', 'smart'],
    'func-style': ['error', 'expression'],
    'func-names': ['error', 'always', { generators: 'as-needed' }],
    camelcase: 0,
    'consistent-return': 0,
    'no-nested-ternary': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
};
