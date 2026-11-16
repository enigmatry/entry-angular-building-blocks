import defaultEnigmatryConfiguration from './libs/eslint-config/index.js';
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultEnigmatryConfiguration,
    {
        ignores: ['libs/scss-foundation/coverage/**']
    },
    {
        files: ['libs/**/*.ts'],
        rules: {
            '@angular-eslint/use-injectable-provided-in': 'off', // TODO BP-1642: 6 injectables (date/time adapters, event plugins, spinner overlay container) are provided where they are used (component providers, provideEntryNativeTimeAdapter, NG_EVENT_PLUGINS), not by providedIn
            '@typescript-eslint/no-unnecessary-condition': 'error',
            // The root tsconfig maps `src/*` to apps/demo-app/src/* so entry-codegen's app-absolute imports
            // ('src/app/shared/shared.module', 'src/app/api/api-reference') resolve inside apps/demo-app/**/generated/.
            // Libraries inherit that mapping through `extends`, so guard the lib -> app boundary here.
            'no-restricted-imports': ['error', {
                patterns: [{
                    group: ['src/**'],
                    message: 'Libraries must not import from the demo app. The `src/*` tsconfig path exists only for generated demo-app code.'
                }]
            }]
        }
    },
    {
        files: ['libs/entry-form/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off' // TODO BP-1647: 8 declarations in entry-form are still NgModule-declared; two of its modules still pull in Formly
        }
    },
    {
        files: ['libs/**/*.html'],
        rules: {
            '@angular-eslint/template/cyclomatic-complexity': 'off', // TODO BP-1642: 12 sites in 4 templates (entry-table x7) need the templates split up
            '@angular-eslint/template/no-non-null-assertion': 'off' // TODO BP-1642: 15 `!` assertions in 9 templates (entry-table x7)
        }
    }
]);