import { EntryFieldFormatDefinition } from '../entry-field-format-definition';

export const initialAmount = 1234.5;
export const euroDefinition: EntryFieldFormatDefinition = { name: 'currency', currencyCode: 'EUR', locale: 'en-US' };
/** Needs `registerLocaleData` for `nl` in the spec. */
export const dutchEuroDefinition: EntryFieldFormatDefinition = { name: 'currency', currencyCode: 'EUR', locale: 'nl' };

export const numberDefinition = (locale = 'en-US'): EntryFieldFormatDefinition => ({ name: 'number', locale });

export const currencyDefinition = (locale: string, currencyCode: string, digitsInfo?: string): EntryFieldFormatDefinition =>
  ({ name: 'currency', locale, currencyCode, digitsInfo });

export const percentDefinition = (locale = 'en-US', multiplier?: number | string): EntryFieldFormatDefinition =>
  ({ name: 'percent', locale, multiplier, digitsInfo: '1.0-2' });

export const dateDefinition: EntryFieldFormatDefinition = { name: 'date', format: 'dd-MM-yyyy' };
