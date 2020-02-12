module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'import/no-mutable-exports': 0,
    'no-param-reassign': 0,
  },
};

