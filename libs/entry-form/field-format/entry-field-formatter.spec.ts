import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import localeDe from '@angular/common/locales/de';
import localeDeCh from '@angular/common/locales/de-CH';
import localeEnIn from '@angular/common/locales/en-IN';
import localeFa from '@angular/common/locales/fa';
import localeFr from '@angular/common/locales/fr';
import localeHe from '@angular/common/locales/he';
import localeNl from '@angular/common/locales/nl';
import localeSv from '@angular/common/locales/sv';
import { TestBed } from '@angular/core/testing';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldFormatter, EntryFieldParseResult } from './entry-field-formatter';
import { EntryFieldInputKind } from './entry-field-input-kind';
import { currencyDefinition, dateDefinition, numberDefinition, percentDefinition } from './testing/field-format-test-data';
import { formatterProviders } from './testing/field-format-test-helpers';

describe('EntryFieldFormatter', () => {
  let formatter: EntryFieldFormatter;

  beforeAll(() => {
    [localeAr, localeDe, localeDeCh, localeEnIn, localeFa, localeFr, localeHe, localeNl, localeSv].forEach(data => registerLocaleData(data));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: formatterProviders() });
    formatter = TestBed.inject(EntryFieldFormatter);
  });

  describe('parse', () => {
    it.each<[string, EntryFieldFormatDefinition, number]>([
      ['1,234.5', numberDefinition(), 1234.5],
      [' -1,234.50 ', numberDefinition(), -1234.5],
      ['.5', numberDefinition(), 0.5],
      ['-0', numberDefinition(), 0],
      ['9007199254740992', numberDefinition(), Number.MAX_SAFE_INTEGER + 1],
      ['\u20ac\u00a0-1.234,50', currencyDefinition('nl', 'EUR'), -1234.5],
      ['-\u20ac 1.234,5', currencyDefinition('nl', 'EUR'), -1234.5],
      ['1,5', currencyDefinition('nl', 'EUR'), 1.5],
      ['1.234,5\u00a0\u20ac', currencyDefinition('de', 'EUR'), 1234.5],
      ['1\'234.5', numberDefinition('de-CH'), 1234.5],
      ['1\u2019234.5', numberDefinition('de-CH'), 1234.5],
      ['CHF-1\u2019234.5', currencyDefinition('de-CH', 'CHF'), -1234.5],
      ['1 234,5', numberDefinition('fr'), 1234.5],
      ['1\u202f234,5', numberDefinition('fr'), 1234.5],
      ['1\u00a0234,5', numberDefinition('fr'), 1234.5],
      ['12,34,567', numberDefinition('en-IN'), 1234567],
      ['\u22121 234,5', numberDefinition('sv'), -1234.5],
      ['-1 234,5', numberDefinition('sv'), -1234.5],
      ['\u200e\u22121,234.5', numberDefinition('fa'), -1234.5],
      ['\u200f1,234.50\u00a0\u200f\u20aa', currencyDefinition('he', 'ILS'), 1234.5],
      ['-1,234.5 \u20aa', currencyDefinition('he', 'ILS'), -1234.5],
      ['12.5', percentDefinition(), 0.125],
      ['7', percentDefinition(), 0.07],
      ['12,5 %', percentDefinition('fr'), 0.125],
      ['12.5\u200e%\u200e', percentDefinition('ar'), 0.125],
      ['12.5', percentDefinition('en-US', 0.01), 12.5],
      ['12.5', percentDefinition('en-US', '0.01'), 12.5],
      ['30', percentDefinition('en-US', 3), 0.1]
    ])('reads the typed text %j with %j as %j', (text, definition, expected) => {
      expect(formatter.parse(text, definition, 'text')).toStrictEqual({ value: expected });
    });

    it.each<[string, EntryFieldFormatDefinition]>([
      ['1,5', numberDefinition()],
      ['1 234.5', numberDefinition()],
      ['1.2.3', numberDefinition()],
      ['1e3', numberDefinition()],
      ['abc', numberDefinition()],
      ['\u0661\u0662\u0663', numberDefinition()],
      ['1\n234', numberDefinition()],
      ['9007199254740993', numberDefinition()],
      ['1000000000000000128', numberDefinition()],
      ['0.12345678901234567890', numberDefinition()],
      [`0.${'0'.repeat(400)}1`, numberDefinition()],
      ['1.5', currencyDefinition('nl', 'EUR')],
      ['1  234,5', numberDefinition('fr')],
      ['1,234,567', numberDefinition('en-IN')]
    ])('rejects the typed text %j with %j', (text, definition) => {
      expect(formatter.parse(text, definition, 'text')).toStrictEqual({ error: true });
    });

    it.each<[string]>([[''], ['   ']])('reads the empty field %j as null', text => {
      expect(formatter.parse(text, percentDefinition(), 'text')).toStrictEqual({ value: null });
    });

    it.each<[string, EntryFieldFormatDefinition, EntryFieldParseResult]>([
      ['1e3', numberDefinition(), { value: 1000 }],
      ['12.5', percentDefinition(), { value: 0.125 }],
      ['1e400', numberDefinition(), { error: true }],
      ['5e-324', percentDefinition('en-US', 3), { error: true }]
    ])('reads %j in a native number input in the browser syntax, rejecting an amount it cannot keep', (text, definition, expected) => {
      expect(formatter.parse(text, definition, 'number')).toStrictEqual(expected);
    });

    it.each<[string, EntryFieldInputKind]>([['2026-11-18', 'native'], [' 18-11-2026 ', 'text']])('keeps %j as typed in a %s input', (text, kind) => {
      expect(formatter.parse(text, dateDefinition, kind)).toStrictEqual({ value: text });
    });

    it('reports an error for text that the browser could not read, whatever the field reads as', () => {
      expect(formatter.parse('', numberDefinition(), 'number', true)).toStrictEqual({ error: true });
    });
  });

  describe('display', () => {
    it.each<[unknown, EntryFieldFormatDefinition, string]>([
      [1234.5, currencyDefinition('en-US', 'EUR'), '\u20ac1,234.50'],
      [1234.5, currencyDefinition('nl', 'EUR'), '\u20ac\u00a01.234,50'],
      [1234.5, currencyDefinition('de', 'EUR'), '1.234,50\u00a0\u20ac'],
      [2.499, currencyDefinition('en-US', 'EUR', '1.2-2'), '\u20ac2.50'],
      [0.125, percentDefinition(), '12.5%'],
      [12.5, percentDefinition('en-US', 0.01), '12.5%'],
      [-1234.5, numberDefinition('sv'), '\u22121\u00a0234,5'],
      [true, { name: 'boolean' }, '\u2713'],
      [false, { name: 'boolean' }, ''],
      ['true', { name: 'boolean' }, 'true'],
      ['9007199254740993', numberDefinition(), '9007199254740993'],
      [null, numberDefinition(), ''],
      ['', currencyDefinition('en-US', 'EUR'), ''],
      ['abc', numberDefinition(), 'abc']
    ])('shows %j with %j as %j', (value, definition, expected) => {
      expect(formatter.display(value, definition)).toBe(expected);
    });

    it('shows a date by its format, and an unparseable date as it is', () => {
      expect(formatter.display(new Date(2026, 10, 6), dateDefinition)).toBe('06-11-2026');
      expect(formatter.display('not a date', dateDefinition)).toBe('not a date');
    });

    it('shows a plain number when the formatted text would not read back', () => {
      expect(formatter.display(1e30, numberDefinition())).toBe(`1${'0'.repeat(30)}`);
    });
  });

  describe('edit', () => {
    it.each<[unknown, EntryFieldFormatDefinition, EntryFieldInputKind, string]>([
      [1234.5, numberDefinition('nl'), 'text', '1234,5'],
      [-1234.5, numberDefinition('sv'), 'text', '\u22121234,5'],
      [1e21, numberDefinition(), 'text', '1000000000000000000000'],
      [0.125, percentDefinition(), 'text', '12.5'],
      [0.07, percentDefinition(), 'text', '7'],
      [0.125, percentDefinition('fr'), 'number', '12.5'],
      [null, numberDefinition(), 'text', ''],
      ['2026-11-18', dateDefinition, 'native', '2026-11-18']
    ])('edits %j with %j in a %s input as %j', (value, definition, kind, expected) => {
      expect(formatter.edit(value, definition, kind)).toBe(expected);
    });
  });
});
