// https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
// https://www.sitepoint.com/react-with-typescript-best-practices/

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: [
    '@typescript-eslint',
    'react-hooks', // Uses eslint-plugin-react-hooks
    'destructuring', // Uses eslint-plugin-destructuring
    'typescript-sort-keys', // Uses typescript-sort-keys
  ],
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:destructuring/recommended',
    'plugin:typescript-sort-keys/recommended',
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    '@typescript-eslint/camelcase': 0, // Would like to use this but cannot because of api data names
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-unused-vars': [2, { args: 'none', ignoreRestSiblings: true }],
    'array-bracket-spacing': [2, 'never'],
    'no-return-await': 2,
    curly: 2,
    'destructuring/no-rename': 0,
    'eol-last': 2,
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'no-const-assign': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-global-assign': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-assign': 2,
    'no-multi-str': 2,
    'no-trailing-spaces': 2,
    'no-unreachable': 2,
    'no-var': 2,
    'no-whitespace-before-property': 2,
    'object-curly-spacing': [2, 'always'],
    'one-var': [2, 'never'],
    'padded-blocks': [2, 'never'],
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'return' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'never', prev: '*', next: 'case' },
    ],
    'prefer-const': 2,
    'prefer-template': 2,
    'react-hooks/rules-of-hooks': 2,
    // 'react-hooks/exhaustive-deps': 1,
    'react/prop-types': 0,
    'react/jsx-boolean-value': [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'newline-after-var': [2, 'always'],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-infix-ops': 2,
    'space-in-parens': [2, 'never'],
    'template-curly-spacing': [2, 'never'],
    'destructuring/in-params': ['error', { 'max-params': 0 }],
    'spaced-comment': [
      2,
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-'],
        },
        block: {
          markers: ['/', '*'],
        },
      },
    ],
    // 'no-nested-ternary': 2,
    'no-param-reassign': [2, { props: false }],
    // 'max-params': [2, 5],
    // 'quote-props': [2, 'as-needed', { keywords: true }],
    'dot-notation': [2, { allowPattern: '^[a-z]+(_[a-z]+)+$' }],
    quotes: [2, 'single', { avoidEscape: true }],
    // 'no-unused-vars': [
    //   2,
    //   {
    //     vars: 'local',
    //     args: 'after-used',
    //     ignoreRestSiblings: true,
    //   },
    // ],
    // 'max-len': [
    //   2,
    //   {
    //     code: 120,
    //     ignoreUrls: true,
    //     ignoreComments: false,
    //     ignoreRegExpLiterals: true,
    //     ignoreStrings: true,
    //     ignoreTemplateLiterals: true,
    //   },
    // ],

    // TODO: turn this on once we get stricter
    '@typescript-eslint/no-explicit-any': 0, // Delete this line
    '@typescript-eslint/ban-ts-ignore': 0, // Delete this line
    '@typescript-eslint/ban-ts-comment': 0, // Delete this line
    '@typescript-eslint/no-use-before-define': 0, // Delete this line
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
