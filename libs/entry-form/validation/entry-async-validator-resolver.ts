import { InjectionToken } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';

/**
 * Resolves a named validator (`.WithValidators("UniqueName")` in entry-code-generation, camelized to `uniqueName`)
 * to a reactive-forms async validator.
 *
 * Temporary: generated forms use reactive forms until they migrate to signal forms, where async validation
 * is declared through schema rules (`validateAsync` / `validateHttp`) and this resolver will be replaced.
 */
export type EntryAsyncValidatorResolver = (name: string) => AsyncValidatorFn;

/**
 * Injected optionally by generated forms. It deliberately has no root default, so when nothing is provided
 * the optional injection yields `null` and named validators are skipped.
 */
export const ENTRY_ASYNC_VALIDATOR_RESOLVER = new InjectionToken<EntryAsyncValidatorResolver>('ENTRY_ASYNC_VALIDATOR_RESOLVER');
