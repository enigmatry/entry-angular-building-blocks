import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER } from './entry-async-validator-resolver';

describe('ENTRY_ASYNC_VALIDATOR_RESOLVER', () => {
  it('yields null from an optional injection when no resolver is provided, so generated forms skip named validators', () => {
    expect(TestBed.inject(ENTRY_ASYNC_VALIDATOR_RESOLVER, null, { optional: true })).toBeNull();
  });
});
