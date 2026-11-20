import { describe, expect, it } from 'vitest';
import { hasSameContent } from './observe-definition';

const today = new Date(0);

const cyclic = (): Record<string, unknown> => {
  const options: Record<string, unknown> = { unit: 'kg' };
  options['self'] = options;
  return { name: 'custom', options };
};

describe('hasSameContent', () => {
  it.each<[string, unknown, unknown]>([
    ['the same properties in another order', { name: 'currency', currencyCode: 'EUR' }, { currencyCode: 'EUR', name: 'currency' }],
    ['equal nested objects', { name: 'custom', options: { unit: 'kg' } }, { name: 'custom', options: { unit: 'kg' } }],
    ['equal nested arrays', { name: 'custom', units: ['kg', 'g'] }, { name: 'custom', units: ['kg', 'g'] }],
    ['the same instance of a class', { name: 'custom', since: today }, { name: 'custom', since: today }]
  ])('is true for %s', (_case, first, second) => {
    expect(hasSameContent(first, second)).toBe(true);
  });

  it.each<[string, unknown, unknown]>([
    ['a different value', { name: 'currency', currencyCode: 'EUR' }, { name: 'currency', currencyCode: 'USD' }],
    ['an undefined property against a missing one', { name: 'currency', digitsInfo: undefined }, { name: 'currency', currencyCode: 'EUR' }],
    ['an extra property', { name: 'number' }, { name: 'number', locale: 'nl' }],
    ['different nested objects', { name: 'custom', options: { unit: 'kg' } }, { name: 'custom', options: { unit: 'g' } }],
    ['an array and an object with the same keys', { name: 'custom', units: ['kg'] }, { name: 'custom', units: { 0: 'kg' } }],
    ['two instances of a class', { name: 'custom', since: new Date(0) }, { name: 'custom', since: new Date(0) }],
    ['separate objects that contain themselves', cyclic(), cyclic()]
  ])('is false for %s', (_case, first, second) => {
    expect(hasSameContent(first, second)).toBe(false);
  });
});
