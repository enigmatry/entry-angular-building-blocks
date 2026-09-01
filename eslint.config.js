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
            '@angular-eslint/prefer-standalone': 'off', // TODO: Remove once both libraries are standalone
            // Kept here rather than in @enigmatry/eslint-config: consuming projects have to adopt
            // signals first. Promote to the shared config once they have.
            '@angular-eslint/prefer-signal-model': 'error',
            '@angular-eslint/prefer-signals': 'error',
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
    }
]);