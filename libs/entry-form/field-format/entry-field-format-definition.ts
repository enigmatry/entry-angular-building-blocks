/**
 * Formatter definition rendered by entry-code-generation as `[entryFieldFormatDefinition]`.
 *
 * Built-in names and the properties they read:
 * - `date`: `format`, `timezone`, `locale`
 * - `currency`: `currencyCode`, `display`, `digitsInfo`, `locale`
 * - `number`: `digitsInfo`, `locale`
 * - `percent`: `digitsInfo`, `locale`, `multiplier`
 * - `boolean`: none
 *
 * Empty strings are treated as "not set". Custom formatters may add their own properties.
 */
export interface EntryFieldFormatDefinition {
  /** `date`, `currency`, `number`, `percent`, `boolean`, or the name of a custom formatter. */
  name: string;
  /** Date format, as for Angular's `DatePipe`. */
  format?: string;
  /** Time zone of a date, as for Angular's `DatePipe`. */
  timezone?: string;
  /** A locale registered with `registerLocaleData`; the application's `LOCALE_ID` when not set. */
  locale?: string;
  /** ISO 4217 currency code, as for Angular's `CurrencyPipe`. */
  currencyCode?: string;
  /** How the currency is shown, as for Angular's `CurrencyPipe`: `symbol` (the default), `code`, `symbol-narrow` or a custom label. */
  display?: string | boolean;
  /** Digits to show, as for Angular's number pipes (`1.2-2`). */
  digitsInfo?: string;
  /** Factor applied to the model value before it is shown as a percentage; 1 when not set. */
  multiplier?: string | number;
  /** Properties of custom formatters. */
  [key: string]: unknown;
}
