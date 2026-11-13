import { shiftDecimalPoint } from './number-conversion';

const percentDecimalPlaces = 2;
const decimalBase = 10;

const powerOfTenExponent = (multiplier: number): number => {
  const exponent = Math.log10(multiplier);
  return Number.isInteger(exponent) && decimalBase ** exponent === multiplier ? exponent : NaN;
};

export const toPercent = (value: number, multiplier: number): number => {
  const exponent = powerOfTenExponent(multiplier);
  if (!Number.isNaN(exponent)) {
    return shiftDecimalPoint(value, exponent + percentDecimalPlaces);
  }
  const shiftedFirst = shiftDecimalPoint(value, percentDecimalPlaces) * multiplier;
  return Number.isFinite(shiftedFirst) ? shiftedFirst : shiftDecimalPoint(value * multiplier, percentDecimalPlaces);
};

export const fromPercent = (percent: number, multiplier: number): number => {
  const exponent = powerOfTenExponent(multiplier);
  if (!Number.isNaN(exponent)) {
    return shiftDecimalPoint(percent, -(exponent + percentDecimalPlaces));
  }
  const dividedFirst = shiftDecimalPoint(percent / multiplier, -percentDecimalPlaces);
  return Number.isFinite(dividedFirst) ? dividedFirst : shiftDecimalPoint(percent, -percentDecimalPlaces) / multiplier;
};
