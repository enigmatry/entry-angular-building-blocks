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
            '@angular-eslint/inject-at-top': 'off', // TODO: Remove once every inject() call sits above the other class fields (54 sites in 23 files)
            '@angular-eslint/prefer-standalone': 'off', // TODO: Remove once both libraries are standalone
            '@angular-eslint/use-injectable-provided-in': 'off', // TODO: Remove once the module-provided injectables (date/time adapters, event plugins, dialog service, spinner overlay container) declare providedIn
            '@typescript-eslint/no-unnecessary-condition': 'error',
            // The root tsconfig maps `apps/*` so entry-codegen's workspace-absolute imports resolve
            // inside apps/demo-app/**/generated/. Libraries inherit that mapping through `extends`,
            // so guard the lib -> app boundary here.
            'no-restricted-imports': ['error', {
                patterns: [{
                    group: ['apps/**'],
                    message: 'Libraries must not import from apps/**. The `apps/*` tsconfig path exists only for generated demo-app code.'
                }]
            }]
        }
    },
    {
        files: ['libs/**/*.html'],
        rules: {
            '@angular-eslint/template/button-has-type': 'off', // TODO: Remove once every <button> in the libraries declares a type (7 sites in 4 files)
            '@angular-eslint/template/cyclomatic-complexity': 'off', // TODO: Remove once the table, search filter and formly autocomplete templates are split up (12 sites in 4 files)
            '@angular-eslint/template/no-non-null-assertion': 'off', // TODO: Remove once the templates stop using `!` (15 sites in 9 files)
            '@angular-eslint/template/require-switch-default': 'off' // TODO: Remove once Angular supports `@default never` (the ControlType switch in entry-search-filter is exhaustive)
        }
    }
]);