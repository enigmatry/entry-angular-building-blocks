import defaultEnigmatryConfiguration from '../../libs/eslint-config/index.js';
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultEnigmatryConfiguration,
    {
        files: ['src/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off', // TODO: Remove once the demo app is standalone
            // Kept here rather than in @enigmatry/eslint-config: consuming projects have to adopt
            // signals first. Promote to the shared config once they have.
            '@angular-eslint/prefer-signal-model': 'error',
            '@angular-eslint/prefer-signals': 'error'
        }
    }
]);