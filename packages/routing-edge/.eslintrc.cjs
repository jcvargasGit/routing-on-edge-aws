module.exports = {
  extends: [
    'prettier',
    'plugin:node/recommended',
    "eslint:recommended"],
  env: {
    node: true,
    es2020: true,
    mocha: true
  },
  parserOptions: {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  rules: {
    'no-console': 1,
    'no-nested-ternary': 0,
    'node/no-unsupported-features/es-syntax': 1,
    'node/no-unpublished-require': 0,
    'no-unused-vars': 0,
    'node/no-unpublished-import': 0,
    'no-async-promise-executor': 'off',
  },
  globals: {
    console: true
  }
}