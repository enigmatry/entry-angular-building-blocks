import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { EntryFieldFormatter } from './entry-field-formatter';
import { dateDefinition, formattedDate, initialDate } from './testing/field-format-test-data';
import { formatterProviders } from './testing/field-format-test-helpers';

describe('EntryFieldFormatter', () => {
  let formatter: EntryFieldFormatter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: formatterProviders() });
    formatter = TestBed.inject(EntryFieldFormatter);
  });

  describe('display of a date definition', () => {
    it.each<[string, unknown]>([
      ['a Date', initialDate],
      ['a timestamp', initialDate.getTime()],
      ['an ISO date', '2026-11-06'],
      ['an ISO date and time', '2026-11-06T09:15:00']
    ])('shows %s in the format of the definition', (_kind, value) => {
      expect(formatter.display(value, dateDefinition)).toBe(formattedDate);
    });

    it.each<[string]>([['06-11-2026'], ['11/06/2026'], ['2026-13-06'], ['2026-02-30'], ['not a date']])('shows the typed text %s as it is', text => {
      expect(formatter.display(text, dateDefinition)).toBe(text);
    });

    it('shows a timestamp beyond the range of a Date as it is', () => {
      expect(formatter.display(1e20, dateDefinition)).toBe('100000000000000000000');
    });

    it('shows the end of a day, written as hour 24, as the start of the next day', () => {
      expect(formatter.display('2026-11-06T24:00:00', dateDefinition)).toBe('07-11-2026');
    });

    it('shows a date in the time zone of the definition', () => {
      expect(formatter.display('2026-11-06T23:30:00Z', { name: 'date', format: 'dd-MM-yyyy HH:mm', timezone: '+0200' })).toBe('07-11-2026 01:30');
    });

    it('throws when the locale of the definition is not registered, as Angular\'s date pipe does', () => {
      expect(() => formatter.display(initialDate, { name: 'date', locale: 'xx' })).toThrow(/locale/u);
    });
  });

  describe('editing text of a date definition', () => {
    it.each<[string, unknown, string]>([
      ['a Date in the format of the definition', initialDate, formattedDate],
      ['a timestamp in the format of the definition', initialDate.getTime(), formattedDate],
      ['an ISO date as it is stored', '2026-11-06', '2026-11-06'],
      ['typed text as it is', '06-11-2026', '06-11-2026']
    ])('edits %s', (_kind, value, expected) => {
      expect(formatter.edit(value, dateDefinition, 'text')).toBe(expected);
    });
  });
});
