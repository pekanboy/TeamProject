module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    rules: {
        'no-unused-vars': [
            'error',
            {ignoreRestSiblings: true, argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'max-lines': [
            'error',
            {max: 500, skipBlankLines: true, skipComments: true},
        ],
        'max-lines-per-function': [
            'error',
            {max: 202, skipBlankLines: true, skipComments: true},
        ],
        'no-console': ['error', {allow: ['warn', 'error']}],
        'import/no-default-export': 'off',
        'import/named': 'off',
        'import/no-unresolved': 'off',
        'import/namespace': 'off',

        'sonarjs/no-small-switch': 'off',
        radix: ['error', 'always'],
        'max-params': ['error', 6],
    }
}
