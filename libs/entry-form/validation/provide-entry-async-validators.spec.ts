import { TestBed } from '@angular/core/testing';
import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { firstValueFrom, from, of } from 'rxjs';
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

  it('resolves a registered name to its validator', () => {
    expect(resolve('uniqueName')).toBe(uniqueName);
  });

  it.each<[string]>([['isEnsured'], ['toString']])('skips the unregistered name %s with a development-mode warning', async name => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const errors = await firstValueFrom(from(resolve(name)(new FormControl('admin'))));

    expect(errors).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(`"${name}"`));
  });
});
