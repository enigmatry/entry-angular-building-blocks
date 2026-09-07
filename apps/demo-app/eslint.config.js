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
            '@angular-eslint/inject-at-top': 'off', // TODO: Remove once every inject() call sits above the other class fields (27 sites in 13 files)
            '@angular-eslint/prefer-standalone': 'off', // TODO: Remove once the demo app is standalone
            '@angular-eslint/use-injectable-provided-in': 'off', // TODO: Remove once the example permission service declares providedIn
            '@typescript-eslint/no-unnecessary-condition': 'error'
        }
    },
    {
        files: ['src/**/*.html'],
        rules: {
            '@angular-eslint/template/button-has-type': 'off', // TODO: Remove once every <button> in the demo app declares a type (16 sites in 11 files)
            '@angular-eslint/template/cyclomatic-complexity': 'off' // TODO: Remove once the example viewer template is split up
        }
    }
]);