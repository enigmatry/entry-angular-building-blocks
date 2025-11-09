import defaultEnigmatryConfiguration from '../../libs/eslint-config/index.js';
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultEnigmatryConfiguration,
    {
        files: ['src/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off' // TODO: Remove when we get rid of Formly
        }
    }
]);