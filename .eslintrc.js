module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  // extends: [
  //   'plugin:vue/essential',
  //   '@vue/standard'
  // ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 'off',
    'semi': ['off', 'always'],
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['off', 'always'],
    'quotes': ['warn', 'single'],
    'comma-dangle': ['off', 'never'],
    'no-undef': 'off',
    'no-constant-condition': 'off',

    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/html-self-closing': 'off',
    'eqeqeq': ['off']
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
}
