import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import eslintReact from '@eslint-react/eslint-plugin'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Base config for all JS/JSX files
  js.configs.recommended,

  // The recommended config from @eslint-react.
  // This object includes its own 'plugins' and 'rules'.
  eslintReact.configs.recommended,

  // Our custom configuration layer for React files.
  // This layer adds to or overrides the previous layers.
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
    // We only need to add the plugins that are NOT in eslintReact.configs.recommended
    plugins: {
      'react-refresh': pluginReactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // We can add or override rules here.
      'react-refresh/only-export-components': 'warn',
      // The prop-types rule from @eslint-react/react is now correctly referenced.
      '@eslint-react/react/prop-types': 'off',
    },
  },

  // Stylistic configuration layer.
  stylistic.configs.customize({
    jsx: true,
    indent: 2,
    quotes: 'single',
    semi: false,
  }),
]
