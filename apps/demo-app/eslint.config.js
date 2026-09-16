import defaultEnigmatryConfiguration from '../../libs/eslint-config/index.js';
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultEnigmatryConfiguration,
    {
        ignores: ['src/assets/**']
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off', // TODO BP-1642: 40 declarations in the demo app are still NgModule-declared
            '@angular-eslint/use-injectable-provided-in': 'off', // TODO BP-1642: the example permission service is provided by its module, not by providedIn
            '@typescript-eslint/no-unnecessary-condition': 'error'
        }
    },
    {
        files: ['src/**/*.html'],
        rules: {
            '@angular-eslint/template/cyclomatic-complexity': 'off' // TODO BP-1642: 1 site, the example viewer template, needs splitting up
        }
    }
]);