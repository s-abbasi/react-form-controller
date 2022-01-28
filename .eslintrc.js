module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:storybook/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier'],
    settings: { 'import/resolver': { typescript: {} } },
    rules: {
        'object-curly-newline': [
            'error',
            {
                ObjectExpression: {
                    multiline: true,
                    minProperties: 4,
                },
                ObjectPattern: { multiline: true },
                ImportDeclaration: 'never',
                ExportDeclaration: {
                    multiline: true,
                    minProperties: 3,
                },
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'prettier/prettier': 'error',
        'arrow-body-style': ['error', 'as-needed'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/destructuring-assignment': 0,
        'comma-dangle': 'off',
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'react/react-in-jsx-scope': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            { allowExpressions: true },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-param-reassign': [
            'warn',
            {
                props: true,
                ignorePropertyModificationsFor: ['state'],
            },
        ],
    },
};
