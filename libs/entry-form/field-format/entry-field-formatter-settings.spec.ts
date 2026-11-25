import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldFormatter } from './entry-field-formatter';
import { initialDate, numberDefinition } from './testing/field-format-test-data';
import { formatterProviders } from './testing/field-format-test-helpers';

describe('EntryFieldFormatter', () => {
  let formatter: EntryFieldFormatter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: formatterProviders() });
    formatter = TestBed.inject(EntryFieldFormatter);
  });

  describe('settings of a definition', () => {
    it.each<[EntryFieldFormatDefinition, unknown, string]>([
      [{ name: 'number', digitsInfo: '', locale: '' }, 1234.5, '1,234.5'],
      [{ name: 'currency', currencyCode: '', display: '', digitsInfo: '', locale: '' }, 1234.5, '$1,234.50'],
      [{ name: 'percent', digitsInfo: '', locale: '', multiplier: '' }, 0.125, '13%'],
      [{ name: 'date', format: '', timezone: '', locale: '' }, initialDate, 'Nov 6, 2026']
    ])('treats the empty strings in %j as not set', (definition, value, expected) => {
      expect(formatter.display(value, definition)).toBe(expected);
    });

    it.each<[EntryFieldFormatDefinition, number, string]>([
      [{ name: 'number', digitsInfo: '1.0-0' }, 1234.5, '1,235'],
      [{ name: 'currency', currencyCode: 'EUR', digitsInfo: '1.0-0' }, 1.5, '\u20ac2'],
      [{ name: 'percent', digitsInfo: '1.1-1' }, 0.1234, '12.3%']
    ])('shows the digits that %j asks for', (definition, value, expected) => {
      expect(formatter.display(value, definition)).toBe(expected);
    });

    it.each<[boolean, string]>([
      [true, '\u20ac1,234.50'],
      [false, 'EUR1,234.50']
    ])('shows the currency for the display setting %s as the currency pipe does', (display, expected) => {
      expect(formatter.display(1234.5, { name: 'currency', currencyCode: 'EUR', display })).toBe(expected);
    });

    it.each<[string, string]>([
      ['0.3333333333333333333333333333', '16.67%'],
      ['0.01', '0.5%'],
      ['1e-500', '0%'],
      ['', '50%'],
      ['abc', '50%']
    ])('reads the multiplier %j of a percent definition, so a half is shown as %s', (multiplier, expected) => {
      expect(formatter.display(0.5, { name: 'percent', digitsInfo: '1.0-2', multiplier })).toBe(expected);
    });
  });

  describe('editing text', () => {
    it.each<[unknown, EntryFieldFormatDefinition, string]>([
      [true, { name: 'boolean' }, '\u2713'],
      [false, { name: 'boolean' }, ''],
      ['true', { name: 'boolean' }, 'true'],
      [5, { name: 'phone' }, '5']
    ])('edits %j with %j as %j in a text input', (value, definition, expected) => {
      expect(formatter.edit(value, definition, 'text')).toBe(expected);
    });

    it('edits the raw value in a native input, also with a numeric definition', () => {
      expect(formatter.edit('1e3', numberDefinition(), 'native')).toBe('1e3');
    });
  });
});
