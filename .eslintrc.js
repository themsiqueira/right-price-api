module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    createDefaultProgram: true
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  settings: {
    'import/internal-regex': '^@app/'
  },
  rules: {
    // default nestjs
    '@typescript-eslint/interface-name-prefix': 'off',
    // off rules
    'no-prototype-builtins': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/prefer-function-type': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/semi': 'off',
    // on rules
    'max-len': [
      'error',
      {
        code: 140
      }
    ],
    'eol-last': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/src/*', '.*'],
            message: 'Please add @app'
          }
        ]
      }
    ],
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
      }
    ],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?'
          },
          Function: {
            message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?'
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?'
          },
          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
          }
        }
      }
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
        allowAny: true,
        allowNullish: true
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        caughtErrors: 'all',
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'always',
        types: 'prefer-import',
        lib: 'always'
      }
    ],
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    // overrides
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  },
  overrides: [
    {
      files: ['test/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'no-restricted-imports': 'off'
      }
    }
  ]
}
