import { InjectionToken, Provider, inject, isDevMode } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER, EntryAsyncValidatorResolver } from './entry-async-validator-resolver';

const skipValidation: AsyncValidatorFn = () => of(null);

const ENTRY_ASYNC_VALIDATOR_MAPS = new InjectionToken<Record<string, AsyncValidatorFn>[]>('ENTRY_ASYNC_VALIDATOR_MAPS');

const resolverFor = (maps: Record<string, AsyncValidatorFn>[], parent: EntryAsyncValidatorResolver | null): EntryAsyncValidatorResolver => name => {
  // Not copied when the resolver is created: a validator may be added to a provided map later.
  const map = [...maps].reverse().find(candidate => Object.hasOwn(candidate, name));
  if (map) {
    return map[name];
  }
  if (parent) {
    return parent(name);
  }
  if (isDevMode()) {
    // eslint-disable-next-line no-console -- a development-mode hint about a validator name that no map contains
    console.warn(`[entry-form] provideEntryAsyncValidators has no validator named "${name}"; the control is created without it.`);
  }
  return skipValidation;
};

/** Provides the resolver from a map of async validators by camelized name; maps here and above it add up. */
export const provideEntryAsyncValidators = (validators: Record<string, AsyncValidatorFn>): Provider => [
  // Not one provider per call: a second call in the same providers array would replace the first one's validators.
  { provide: ENTRY_ASYNC_VALIDATOR_MAPS, useValue: validators, multi: true },
  {
    provide: ENTRY_ASYNC_VALIDATOR_RESOLVER,
    useFactory: () => resolverFor(inject(ENTRY_ASYNC_VALIDATOR_MAPS), inject(ENTRY_ASYNC_VALIDATOR_RESOLVER, { optional: true, skipSelf: true }))
  }
];
