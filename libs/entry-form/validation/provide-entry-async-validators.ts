import { Provider, isDevMode } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER, EntryAsyncValidatorResolver } from './entry-async-validator-resolver';

const skipValidation: AsyncValidatorFn = () => of(null);

const resolverFor = (validators: Record<string, AsyncValidatorFn>): EntryAsyncValidatorResolver => name => {
  if (Object.hasOwn(validators, name)) {
    return validators[name];
  }
  if (isDevMode()) {
    // eslint-disable-next-line no-console
    console.warn(`[entry-form] provideEntryAsyncValidators has no validator named "${name}"; the control is created without it.`);
  }
  return skipValidation;
};

/**
 * Provides `ENTRY_ASYNC_VALIDATOR_RESOLVER` from a map of named async validators, keyed by the camelized names that
 * generated forms request (`.WithValidators("UniqueName")` requests `uniqueName`).
 *
 * A name the map does not contain is skipped (with a warning in development mode), so the form still renders. A custom
 * resolver provided through the token directly must return a validator for every name it is asked for.
 */
export const provideEntryAsyncValidators = (validators: Record<string, AsyncValidatorFn>): Provider => ({
  provide: ENTRY_ASYNC_VALIDATOR_RESOLVER,
  useFactory: () => resolverFor(validators)
});
