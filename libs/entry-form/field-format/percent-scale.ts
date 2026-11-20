import { plainNumber, shiftDecimalPoint, shiftDecimalText } from './number-conversion';

const percentDecimalPlaces = 2;
const decimalBase = 10;

const powerOfTenExponent = (multiplier: number): number => {
  const exponent = Math.log10(multiplier);
  return Number.isInteger(exponent) && decimalBase ** exponent === multiplier ? exponent : NaN;
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
