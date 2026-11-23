import { describe, expect, it } from 'vitest';
import { formattableDate } from './formattable-date';

describe('formattableDate', () => {
  it.each<[string, unknown]>([
    ['a Date', new Date(2026, 10, 6)],
    ['a timestamp', 1794000000000],
    ['the last timestamp a Date holds', 8.64e15],
    ['an ISO date', '2026-11-06'],
    ['the last day of February in a leap year', '2028-02-29'],
    ['an ISO date and time', '2026-11-06T09:15'],
    ['an ISO date and time with seconds', '2026-11-06T09:15:00'],
    ['an ISO date and time with a fraction and UTC', '2026-11-06T09:15:00.1234567Z'],
    ['an ISO date and time with an offset', '2026-11-06T09:15:00+01:00'],
    ['an ISO date and time with an offset without a colon', '2026-11-06T09:15:00-0500'],
    ['an ISO date and time with the largest offset', '2026-11-06T09:15:00+23:59'],
    ['the end of a day, written as hour 24', '2026-11-06T24:00'],
    ['the end of a day with seconds, a fraction and UTC', '2026-11-06T24:00:00.000Z']
  ])('returns %s as it is', (_kind, value) => {
    expect(formattableDate(value)).toBe(value);
  });

  it.each<[string, unknown]>([
    ['a date typed day first', '06-11-2026'],
    ['a date typed with slashes', '11/06/2026'],
    ['a date in words', 'Nov 6, 2026'],
    ['a month that does not exist', '2026-13-06'],
    ['a day that no month has', '2026-11-32'],
    ['a day that its month does not have', '2026-11-31'],
    ['the 29th of February outside a leap year', '2026-02-29'],
    ['a day that its month does not have, with a time', '2026-02-30T09:15:00Z'],
    ['an hour that does not exist', '2026-11-06T25:00'],
    ['a minute after the end of the day', '2026-11-06T24:01'],
    ['a second after the end of the day', '2026-11-06T24:00:01'],
    ['an unfinished ISO date and time', '2026-11-06T'],
    ['an offset with minutes that do not exist', '2026-11-06T09:15:00+01:99'],
    ['an offset with an hour that does not exist', '2026-11-06T09:15:00+24:00'],
    ['an offset without a colon that does not exist', '2026-11-06T09:15:00-0560'],
    ['a timestamp written as a string', '1794000000000'],
    ['text', 'not a date'],
    ['an invalid Date', new Date(NaN)],
    ['a timestamp beyond the range of a Date', 8.64e15 + 1],
    ['a number that is not finite', Infinity],
    ['a boolean', true],
    ['null', null]
  ])('returns undefined for %s', (_kind, value) => {
    expect(formattableDate(value)).toBeUndefined();
  });
});
