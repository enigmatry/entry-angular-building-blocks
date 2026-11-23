/** The format of a field, as entry-code-generation renders it for `[entryFieldFormatDefinition]`. */
export interface EntryFieldFormatDefinition {
  /** `date`, `currency`, `number`, `percent` or `boolean`; a value with any other name is shown unformatted. */
  name: string;
  /** Date format, as for Angular's `DatePipe`. */
  format?: string;
  /** Time zone of a date, as for Angular's `DatePipe`. */
  timezone?: string;
  /** A locale registered with `registerLocaleData`; the application's `LOCALE_ID` when not set. */
  locale?: string;
  /** ISO 4217 currency code, as for Angular's `CurrencyPipe`. */
  currencyCode?: string;
  /** How `CurrencyPipe` shows the currency: `symbol` (the default), `code`, `symbol-narrow`, a label or a boolean. */
  display?: string | boolean;
  /** Digits to show, as for Angular's number pipes (`1.2-2`). */
  digitsInfo?: string;
  /** Factor applied to the model value before it is shown as a percentage; 1 when not set. */
  multiplier?: string | number;
  /** Other properties, which a generator may emit for its own formatters; the directive does not read them. */
  [key: string]: unknown;
}
