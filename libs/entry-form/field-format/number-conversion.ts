const maximumExponent = 400;

export const plainNumber = (value: number): string => {
  const sign = value < 0 ? '-' : '';
  const absolute = String(Math.abs(value));
  if (!absolute.includes('e')) {
    return sign + absolute;
  }
  const [mantissa, exponent] = absolute.split('e');
  const [integerDigits, fractionDigits = ''] = mantissa.split('.');
  const digits = integerDigits + fractionDigits;
  const point = integerDigits.length + Number(exponent);
  if (point <= 0) {
    return `${sign}0.${'0'.repeat(-point)}${digits}`;
  }
  if (point >= digits.length) {
    return sign + digits + '0'.repeat(point - digits.length);
  }
  return `${sign}${digits.slice(0, point)}.${digits.slice(point)}`;
};

export const shiftDecimalPoint = (value: number, places: number): number => {
  const [mantissa, exponent = '0'] = String(value).split('e');
  return Number(`${mantissa}e${Number(exponent) + places}`);
};

const withoutTrailingZeros = (digits: string): string => {
  let end = digits.length;
  while (end > 0 && digits[end - 1] === '0') {
    end -= 1;
  }
  return digits.slice(0, end);
};

export const decimalText = (negative: boolean, integerDigits: string, fractionDigits: string): string => {
  const integer = integerDigits.replace(/^0+(?=\d)/u, '') || '0';
  const fraction = withoutTrailingZeros(fractionDigits);
  const unsigned = fraction ? `${integer}.${fraction}` : integer;
  return negative && unsigned !== '0' ? `-${unsigned}` : unsigned;
};

export const shiftDecimalText = (text: string, places: number): string => {
  const negative = text.startsWith('-');
  const [integerDigits, fractionDigits = ''] = (negative ? text.slice(1) : text).split('.');
  const point = integerDigits.length + places;
  const digits = integerDigits + fractionDigits;
  const padded = point < 0 ? '0'.repeat(-point) + digits : digits.padEnd(point, '0');
  const position = Math.max(point, 0);
  return decimalText(negative, padded.slice(0, position), padded.slice(position));
};

const numberInputSyntax = /^([+-]?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/u;

const numberInputParts = (text: string): string[] | undefined => {
  const [, sign, integerDigits, fractionDigits = '', exponentText = '0'] = numberInputSyntax.exec(text.trim()) ?? [];
  return /\d/u.test(`${integerDigits}${fractionDigits}`) ? [sign, integerDigits, fractionDigits, exponentText] : undefined;
};

/** The number nearest to text in decimal or exponent notation; NaN for other text. */
export const nearestNumber = (text: string): number => numberInputParts(text) ? Number(text) : NaN;

export const numberInputDecimal = (text: string): string | undefined => {
  const parts = numberInputParts(text);
  if (!parts) {
    return undefined;
  }
  const [sign, integerDigits, fractionDigits, exponentText] = parts;
  const mantissa = decimalText(sign === '-', integerDigits, fractionDigits);
  if (mantissa === '0') {
    return mantissa;
  }
  const [wholeDigits, decimals = ''] = mantissa.replace('-', '').split('.');
  const magnitude = wholeDigits === '0' ? -decimals.search(/[1-9]/u) : wholeDigits.length;
  const exponent = Number(exponentText);
  return Math.abs(magnitude + exponent) > maximumExponent ? undefined : shiftDecimalText(mantissa, exponent);
};

/** NaN for anything but a finite number or a numeric string that reads back as the same number. */
export const toNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : NaN;
  }
  const decimal = typeof value === 'string' ? numberInputDecimal(value) : undefined;
  return decimal !== undefined && plainNumber(Number(decimal)) === decimal ? Number(decimal) : NaN;
};
