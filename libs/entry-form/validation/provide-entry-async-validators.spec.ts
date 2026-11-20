import { TestBed } from '@angular/core/testing';
import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER, EntryAsyncValidatorResolver } from './entry-async-validator-resolver';
import { provideEntryAsyncValidators } from './provide-entry-async-validators';

const uniqueName: AsyncValidatorFn = () => of({ uniqueName: true });

describe('provideEntryAsyncValidators', () => {
  let resolve: EntryAsyncValidatorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideEntryAsyncValidators({ uniqueName })] });
    resolve = TestBed.inject(ENTRY_ASYNC_VALIDATOR_RESOLVER);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves a registered name to its validator, which a control then runs', () => {
    const control = new FormControl('admin', { asyncValidators: [resolve('uniqueName')] });

    expect(resolve('uniqueName')).toBe(uniqueName);
    expect(control.hasError('uniqueName')).toBe(true);
  });

  it.each<[string]>([['isEnsured'], ['toString']])('skips the unregistered name %s with a development-mode warning', name => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const control = new FormControl('admin', { asyncValidators: [resolve(name)] });

    expect(control.status).toBe('VALID');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(`"${name}"`));
  });
});
