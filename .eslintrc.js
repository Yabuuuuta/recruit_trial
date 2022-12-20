module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  settings: {
    'import/resolver': 'webpack',
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  rules: {
    curly: 2,
    'no-console': 0,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-plusplus': 0,
    'no-use-before-define': [
      2,
      {
        functions: false,
      },
    ],
    'no-unused-vars': [
      2,
      {
        vars: 'local',
        args: 'none',
      },
    ],
    'func-names': [2, 'never'],
    'consistent-return': [
      2,
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    'prefer-destructuring': [2, { object: true, array: false }],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: [
          'webpack.config.js',
          './gulpfile.js',
          './gulp/**',
          'postcss.config.js',
        ],
        optionalDependencies: false,
      },
    ],
  },
};
