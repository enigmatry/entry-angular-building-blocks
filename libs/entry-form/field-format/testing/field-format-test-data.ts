import { EntryFieldFormatDefinition } from '../entry-field-format-definition';

export const initialAmount = 1234.5;
export const editedAmount = String(initialAmount);
export const formattedAmount = '\u20ac1,234.50';
export const writtenAmount = 99;
export const formattedWrittenAmount = '\u20ac99.00';
export const euroDefinition: EntryFieldFormatDefinition = { name: 'currency', currencyCode: 'EUR', locale: 'en-US' };
/** Needs `registerLocaleData` for `nl` in the spec. */
export const dutchEuroDefinition: EntryFieldFormatDefinition = { name: 'currency', currencyCode: 'EUR', locale: 'nl' };

export const numberDefinition = (locale = 'en-US'): EntryFieldFormatDefinition => ({ name: 'number', locale });

export const currencyDefinition = (locale: string, currencyCode: string, digitsInfo?: string): EntryFieldFormatDefinition =>
  ({ name: 'currency', locale, currencyCode, digitsInfo });

export const percentDefinition = (locale = 'en-US', multiplier?: number | string): EntryFieldFormatDefinition =>
  ({ name: 'percent', locale, multiplier, digitsInfo: '1.0-2' });

export const dateDefinition: EntryFieldFormatDefinition = { name: 'date', format: 'dd-MM-yyyy' };
export const initialDate = new Date('2026-11-06T00:00:00');
export const formattedDate = '06-11-2026';
