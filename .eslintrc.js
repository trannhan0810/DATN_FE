module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    fetch: true,
    navigator: true,
    __DEV__: true,
    XMLHttpRequest: true,
    FormData: true,
  },

  ignorePatterns: ['node_modules'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'import/extensions': 'off',
    'import/order': ['warn', { groups: ['builtin', 'external', 'parent', 'sibling', 'index'] }],
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    'no-param-reassign': ['warn', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
}
