import defaultEnigmatryConfiguration from './libs/eslint-config/index.js';

export default [
    ...defaultEnigmatryConfiguration,
    {
        ignores: ['libs/scss-foundation/coverage/**']
    },
    {
        files: ['libs/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off' // TODO: Remove when we get rid of Formly
        }
    }
];