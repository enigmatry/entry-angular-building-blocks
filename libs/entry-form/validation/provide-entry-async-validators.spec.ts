import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER, EntryAsyncValidatorResolver } from './entry-async-validator-resolver';
import { provideEntryAsyncValidators } from './provide-entry-async-validators';
import { AsyncValidatorsTestHostComponent, uniqueCode } from './testing/async-validators-test-host.component';

const uniqueName: AsyncValidatorFn = () => of({ uniqueName: true });
const otherUniqueName: AsyncValidatorFn = () => of({ otherUniqueName: true });

describe('provideEntryAsyncValidators', () => {
  let resolve: EntryAsyncValidatorResolver;

  const resolverOf = (...maps: Record<string, AsyncValidatorFn>[]): EntryAsyncValidatorResolver =>
    Injector.create({ providers: maps.map(map => provideEntryAsyncValidators(map)), parent: TestBed.inject(Injector) })
      .get(ENTRY_ASYNC_VALIDATOR_RESOLVER);

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

  it('adds the map of a child injector to the one provided above it', () => {
    const resolveInChild = resolverOf({ uniqueCode });

    expect(resolveInChild('uniqueCode')).toBe(uniqueCode);
    expect(resolveInChild('uniqueName')).toBe(uniqueName);
    expect(resolve('uniqueName')).toBe(uniqueName);
  });

  it('adds the map in the providers of a component to the one provided above it', () => {
    const resolveInComponent = TestBed.createComponent(AsyncValidatorsTestHostComponent).componentInstance.resolve;

    expect(resolveInComponent('uniqueCode')).toBe(uniqueCode);
    expect(resolveInComponent('uniqueName')).toBe(uniqueName);
  });

  it('combines the maps that are provided in the same injector', () => {
    const resolveBoth = resolverOf({ uniqueCode }, { otherUniqueName });

    expect(resolveBoth('uniqueCode')).toBe(uniqueCode);
    expect(resolveBoth('otherUniqueName')).toBe(otherUniqueName);
  });

  it('takes the validator of the last map when two maps in the same injector contain a name', () => {
    expect(resolverOf({ uniqueName: uniqueCode }, { uniqueName: otherUniqueName })('uniqueName')).toBe(otherUniqueName);
  });

  it('finds a validator that is added to a provided map after the resolver was created', () => {
    const map: Record<string, AsyncValidatorFn> = {};
    const resolveLater = resolverOf(map);

    map['uniqueCode'] = uniqueCode;

    expect(resolveLater('uniqueCode')).toBe(uniqueCode);
  });

  it('takes the validator of a child injector over the one that is provided above it under the same name', () => {
    expect(resolverOf({ uniqueName: otherUniqueName })('uniqueName')).toBe(otherUniqueName);
  });

  it('skips a name that neither the map of a child injector nor the one above it contains, with a development-mode warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const control = new FormControl('admin', { asyncValidators: [resolverOf({ uniqueCode })('isEnsured')] });

    expect(control.status).toBe('VALID');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"isEnsured"'));
  });

  it.each<[string]>([['isEnsured'], ['toString']])('skips the unregistered name %s with a development-mode warning', name => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const control = new FormControl('admin', { asyncValidators: [resolve(name)] });

    expect(control.status).toBe('VALID');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(`"${name}"`));
  });
});
