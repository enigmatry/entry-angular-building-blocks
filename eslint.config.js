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
            '@angular-eslint/prefer-standalone': 'off', // TODO BP-1642: 28 declarations in libs are still NgModule-declared; going standalone is a breaking change for both published libraries
            '@angular-eslint/use-injectable-provided-in': 'off', // TODO BP-1642: 7 module-provided injectables (date/time adapters, event plugins, dialog service, spinner overlay container) declare their provider in a module, not in providedIn
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
            '@angular-eslint/template/cyclomatic-complexity': 'off', // TODO BP-1642: 12 sites in 4 templates (entry-table x7) need the templates split up
            '@angular-eslint/template/no-non-null-assertion': 'off' // TODO BP-1642: 15 `!` assertions in 9 templates (entry-table x7)
        }
    }
]);