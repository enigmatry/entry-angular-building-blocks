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
  name: string;
  format?: string;
  timezone?: string;
  locale?: string;
  currencyCode?: string;
  display?: string | boolean;
  digitsInfo?: string;
  multiplier?: string | number;
  [key: string]: unknown;
}
