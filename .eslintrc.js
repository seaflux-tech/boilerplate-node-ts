module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-prototype-builtins": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "_" }]
    },
    env: {
        node: true
    }
};