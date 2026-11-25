import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldFormatter } from './entry-field-formatter';
import { percentDefinition } from './testing/field-format-test-data';
import { formatterProviders } from './testing/field-format-test-helpers';

describe('EntryFieldFormatter', () => {
  let formatter: EntryFieldFormatter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: formatterProviders() });
    formatter = TestBed.inject(EntryFieldFormatter);
  });

  describe('limits that the README documents', () => {
    it('shows a percentage of 17 significant digits with its last digit rounded the other way, and keeps the typed value', () => {
      const definition: EntryFieldFormatDefinition = { name: 'percent', locale: 'en-US', multiplier: 0.01, digitsInfo: '1.2-2' };

      expect(formatter.parse('12345678912345.254', definition, 'text')).toStrictEqual({ value: 12345678912345.254 });
      expect(formatter.display(12345678912345.254, definition)).toBe('12,345,678,912,345.26%');
      expect(formatter.edit(12345678912345.254, definition, 'text')).toBe('12345678912345.254');
    });

    it('edits a percentage beyond the largest number as its full decimal text in a text input, and reads it back', () => {
      const text = formatter.edit(1e307, percentDefinition(), 'text');

      expect(text).toBe(`1${'0'.repeat(309)}`);
      expect(formatter.parse(text, percentDefinition(), 'text')).toStrictEqual({ value: 1e307 });
    });

    it('gives a number input text beyond the largest number for such a percentage, which the input cannot hold', () => {
      expect(Number(formatter.edit(1e307, percentDefinition(), 'number'))).toBe(Infinity);
    });

    it('shows a percentage beyond the largest number as Infinity when the multiplier is not a power of ten, and does not accept it back', () => {
      const definition = percentDefinition('en-US', 3);

      expect(formatter.display(1e306, definition)).toBe('Infinity');
      expect(formatter.edit(1e306, definition, 'text')).toBe('Infinity');
      expect(formatter.parse('Infinity', definition, 'text')).toStrictEqual({ error: true });
    });
  });
});
