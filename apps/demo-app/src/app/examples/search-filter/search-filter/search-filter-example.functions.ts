import { Country } from './users';

const countryContinents: Partial<Record<Country, string>> = {
  [Country.unitedStates]: 'Americas',
  [Country.canada]: 'Americas',
  [Country.mexico]: 'Americas',
  [Country.brazil]: 'Americas',
  [Country.argentina]: 'Americas',
  [Country.china]: 'Asia',
  [Country.india]: 'Asia',
  [Country.japan]: 'Asia',
  [Country.southKorea]: 'Asia',
  [Country.indonesia]: 'Asia',
  [Country.australia]: 'Oceania',
  [Country.southAfrica]: 'Africa'
};

/** The group header an option is rendered under. */
export const countryContinent = (country: Country): string => countryContinents[country] ?? 'Europe';

/** Keeps what the user types in a score filter to a decimal, in whichever separator the locale uses. */
export const maskDecimalScore = (value: unknown, locale: string): string => {
  const exampleDecimalValue = 1.1;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const validSeparator = exampleDecimalValue.toLocaleString(locale).substring(1, 2);
  const wrongSeparator = validSeparator === ',' ? '.' : ',';
  return String(value ?? '')
    .replace(wrongSeparator, validSeparator)
    .replace(/[^0-9.,]/gu, '')
    .replace(/,/gu, '.')
    .replace(/^0+/u, ''); // Remove leading zeros
};
