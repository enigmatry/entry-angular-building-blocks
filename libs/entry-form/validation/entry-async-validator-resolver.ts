import { InjectionToken } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';

/** Returns the async validator for a camelized `.WithValidators` name, and must return one for every name. */
export type EntryAsyncValidatorResolver = (name: string) => AsyncValidatorFn;

/** Injected optionally by generated forms; it has no root default. Temporary: signal forms will replace it. */
export const ENTRY_ASYNC_VALIDATOR_RESOLVER = new InjectionToken<EntryAsyncValidatorResolver>('ENTRY_ASYNC_VALIDATOR_RESOLVER');
