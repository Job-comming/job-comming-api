module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    es6: true,
  },
  plugins: ['import'],
  rules: {
    'no-empty-pattern': 'off',
    'no-prototype-builtins': 'off',
  },
}
