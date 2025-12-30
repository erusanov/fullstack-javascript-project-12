import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import eslintReact from '@eslint-react/eslint-plugin'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default [
  js.configs.recommended,
  eslintReact.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-refresh': pluginReactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
      '@eslint-react/react/prop-types': 'off',
    },
  },
  stylistic.configs.customize({
    jsx: true,
    indent: 2,
    quotes: 'single',
    semi: false,
  }),
]
