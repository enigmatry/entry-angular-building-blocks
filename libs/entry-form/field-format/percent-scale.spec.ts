import { describe, expect, it } from 'vitest';
import { plainNumber } from './number-conversion';
import { percentDisplayValue, percentEditText, percentModel, percentModelText } from './percent-scale';

describe('percentDisplayValue', () => {
  it.each<[number, number, number]>([
    [0.125, 1, 0.125],
    [12.5, 0.01, 0.125],
    [0.125, 100, 12.5],
    [0.0101, 1000, 10.1]
  ])('scales %j by the power-of-ten multiplier %j exactly to %j', (value, multiplier, expected) => {
    expect(percentDisplayValue(value, multiplier)).toBe(expected);
  });

  it('multiplies by any other multiplier in floating point', () => {
    expect(percentDisplayValue(0.1, 3)).toBe(0.30000000000000004);
  });
});

describe('percentEditText', () => {
  it.each<[number, number, string]>([
    [0.125, 1, '12.5'],
    [0.07, 1, '7'],
    [-0.125, 1, '-12.5'],
    [12.5, 0.01, '12.5'],
    [0.125, 1000, '12500'],
    [1, 3, '300'],
    [0.1, 3, '30'],
    [0.07, 1e23, `7${'0'.repeat(23)}`],
    [7, 1e-7, '0.00007']
  ])('edits %j with multiplier %j as the percentage %s', (value, multiplier, expected) => {
    expect(percentEditText(value, multiplier)).toBe(expected);
  });

  it('multiplies first when shifting first would overflow', () => {
    expect(percentEditText(1e307, 0.002)).toBe(plainNumber(2e306));
  });
});

describe('percentModelText', () => {
  it.each<[string, number, string]>([
    ['12.5', 1, '0.125'],
    ['-12.5', 1, '-0.125'],
    ['7', 1, '0.07'],
    ['0', 1, '0'],
    ['12.5', 0.01, '12.5'],
    ['12.5', 100, '0.00125']
  ])('reads the percentage %s with multiplier %j as the exact model text %s', (percent, multiplier, expected) => {
    expect(percentModelText(percent, multiplier)).toBe(expected);
  });

  it.each<[number]>([[3], [0.5], [0], [-10], [20]])('has no exact model text for the multiplier %j', multiplier => {
    expect(percentModelText('12.5', multiplier)).toBeUndefined();
  });
});

describe('percentModel', () => {
  it.each<[string, number, number]>([
    ['7', 1, 0.07],
    ['0.29', 1, 0.0029],
    ['12.5', 0.01, 12.5],
    ['300', 3, 1],
    ['30', 3, 0.1],
    ['30', 1e23, 3e-24],
    ['0.00007', 1e-7, 7]
  ])('reads the percentage %s with multiplier %j as %j', (percent, multiplier, expected) => {
    expect(percentModel(percent, multiplier)).toBe(expected);
  });

  it('shifts first when dividing first would overflow', () => {
    expect(percentModel(plainNumber(1e308), 0.5)).toBe(2e306);
  });

  it('has no finite model for a zero multiplier', () => {
    expect(Number.isFinite(percentModel('5', 0))).toBe(false);
  });
});
