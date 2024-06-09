module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true
          }
        ]
      }
    }
  ]
}
