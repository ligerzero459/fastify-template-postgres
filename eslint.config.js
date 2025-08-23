const { js } = require('@eslint/js')

module.exports = {
  languageOptions: {
    ecmaVersion: 2021
    , sourceType: 'module'
    , globals: {
      // Node.js globals
      process: 'readonly'
    , Buffer: 'readonly'
    , __dirname: 'readonly'
    , __filename: 'readonly'
    , console: 'readonly'
    , global: 'readonly'
    , module: 'readonly'
    , require: 'readonly'
    , exports: 'readonly'
    }
  }
  , rules: {
    'strict': ['error', 'global']
  , 'comma-style': ['error', 'first']
  , 'quotes': ['error', 'single']
  , 'semi': ['error', 'never']
  , 'no-trailing-spaces': 'error'
  , 'eol-last': 'error'
  , 'no-multiple-empty-lines': ['error', { 'max': 1 }]
  , 'object-curly-spacing': ['error', 'always']
  , 'array-bracket-spacing': ['error', 'never']
  , 'space-before-function-paren': ['error', 'never']
  , 'keyword-spacing': 'error'
  , 'space-infix-ops': 'error'
  , 'comma-spacing': ['error', { 'before': false, 'after': true }]
  , 'brace-style': ['error', '1tbs', { 'allowSingleLine': true }]
  , 'no-console': 'warn'
  }
}
