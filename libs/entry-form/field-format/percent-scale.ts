import { plainNumber, shiftDecimalPoint, shiftDecimalText } from './number-conversion';

const percentDecimalPlaces = 2;
const fractionPrefix = '0.';

// Read from the decimal text: 10 ** n is not exact for every n (10 ** 23 is 1.0000000000000001e23).
const powerOfTenExponent = (multiplier: number): number => {
  const text = plainNumber(multiplier);
  if (/^10*$/u.test(text)) {
    return text.length - 1;
  }
  return /^0\.0*1$/u.test(text) ? fractionPrefix.length - text.length : NaN;
};

export const percentDisplayValue = (value: number, multiplier: number): number => {
  const exponent = powerOfTenExponent(multiplier);
  return Number.isNaN(exponent) ? value * multiplier : Number(shiftDecimalText(plainNumber(value), exponent));
};

export const percentEditText = (value: number, multiplier: number): string => {
  const exponent = powerOfTenExponent(multiplier);
  if (!Number.isNaN(exponent)) {
    return shiftDecimalText(plainNumber(value), exponent + percentDecimalPlaces);
  }
  const shiftedFirst = shiftDecimalPoint(value, percentDecimalPlaces) * multiplier;
  return plainNumber(Number.isFinite(shiftedFirst) ? shiftedFirst : shiftDecimalPoint(value * multiplier, percentDecimalPlaces));
};

export const percentModelText = (percent: string, multiplier: number): string | undefined => {
  const exponent = powerOfTenExponent(multiplier);
  return Number.isNaN(exponent) ? undefined : shiftDecimalText(percent, -(exponent + percentDecimalPlaces));
};

export const percentModel = (percent: string, multiplier: number): number => {
  const modelText = percentModelText(percent, multiplier);
  if (modelText) {
    return Number(modelText);
  }
  const value = Number(percent);
  const dividedFirst = shiftDecimalPoint(value / multiplier, -percentDecimalPlaces);
  return Number.isFinite(dividedFirst) ? dividedFirst : shiftDecimalPoint(value, -percentDecimalPlaces) / multiplier;
};
