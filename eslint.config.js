import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**', '.cloudflare/**', 'docker/**']
  },

  // Base configuration for all files
  js.configs.recommended,

  // Vue 3 recommended rules
  ...vue.configs['flat/recommended'],

  // Configuration for Vue and TypeScript files
  {
    files: ['**/*.vue', '**/*.ts', '**/*.js'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      vue,
      prettier
    },
    rules: {
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off', // For v-model on props in modals
      'vue/no-unused-vars': 'warn', // Allow unused vars in v-for

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],

      // JavaScript rules
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Prettier integration
      'prettier/prettier': 'warn'
    }
  },

  // Prettier config (disable conflicting rules)
  prettierConfig
];
