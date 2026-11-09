export const toNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : NaN;
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : NaN;
  }
  return NaN;
};

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
