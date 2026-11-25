import { describe, expect, it } from 'vitest';
import { decimalText, numberInputDecimal, plainNumber, shiftDecimalPoint, shiftDecimalText, toNumber } from './number-conversion';

describe('toNumber', () => {
  it.each<[number | string, number]>([
    [12.5, 12.5],
    ['12.5', 12.5],
    [' 7 ', 7],
    ['1e3', 1000],
    ['12.50', 12.5],
    ['-0', 0]
  ])('reads %j as %j', (value, expected) => {
    expect(toNumber(value)).toBe(expected);
  });

  it.each<[unknown]>([[''], ['  '], ['abc'], [Infinity], [-Infinity], [NaN], [null], [undefined], [true], [{}]])('reads %j as NaN', value => {
    expect(toNumber(value)).toBeNaN();
  });

  it.each<[string]>([
    ['9007199254740993'],
    ['0.1234567890123456789'],
    ['1e400'],
    ['0x10']
  ])('reads the string %s as NaN, because it would not read back as written', value => {
    expect(toNumber(value)).toBeNaN();
  });
});

describe('plainNumber', () => {
  it.each<[number, string]>([
    [123.45, '123.45'],
    [-0, '0'],
    [1e21, '1000000000000000000000'],
    [1.2345e21, '1234500000000000000000'],
    [-1.5e22, '-15000000000000000000000'],
    [1e-7, '0.0000001'],
    [-1.5e-7, '-0.00000015'],
    [Number.MAX_SAFE_INTEGER + 2, '9007199254740992']
  ])('writes %j as %s without exponent notation', (value, expected) => {
    expect(plainNumber(value)).toBe(expected);
  });
});

describe('shiftDecimalPoint', () => {
  it.each<[number, number, number]>([
    [1.005, 2, 100.5],
    [0.07, 2, 7],
    [1e-7, 2, 0.00001],
    [12.5, -2, 0.125]
  ])('shifts %j by %j places to %j without floating-point error', (value, places, expected) => {
    expect(shiftDecimalPoint(value, places)).toBe(expected);
  });
});

describe('decimalText', () => {
  it.each<[boolean, string, string, string]>([
    [false, '007', '500', '7.5'],
    [false, '', '5', '0.5'],
    [false, '', '', '0'],
    [true, '0', '000', '0'],
    [true, '', '25', '-0.25'],
    [true, '1234', '', '-1234']
  ])('writes negative=%s, %j and %j as %s', (negative, integerDigits, fractionDigits, expected) => {
    expect(decimalText(negative, integerDigits, fractionDigits)).toBe(expected);
  });

  it('trims a long run of fraction zeros that another digit follows without retrying at every zero', () => {
    const zeros = '0'.repeat(400000);

    expect(decimalText(false, '1', `${zeros}1${zeros}`)).toBe(`1.${zeros}1`);
  });
});

describe('shiftDecimalText', () => {
  it.each<[string, number, string]>([
    ['12.5', -2, '0.125'],
    ['-0.125', 2, '-12.5'],
    ['1', 3, '1000'],
    ['0.001', 3, '1'],
    ['5', -4, '0.0005'],
    ['-0.5', 0, '-0.5']
  ])('shifts %s by %j places to %s', (text, places, expected) => {
    expect(shiftDecimalText(text, places)).toBe(expected);
  });
});

describe('numberInputDecimal', () => {
  it.each<[string, string]>([
    ['1e3', '1000'],
    ['-1.5E-2', '-0.015'],
    ['+7', '7'],
    [' 12 ', '12'],
    ['.5', '0.5'],
    ['5.', '5'],
    ['-0', '0'],
    ['0e999', '0']
  ])('reads the native number input text %j as %s', (text, expected) => {
    expect(numberInputDecimal(text)).toBe(expected);
  });

  it.each<[string, string]>([
    ['1e399', `1${'0'.repeat(399)}`],
    ['0.001e-398', `0.${'0'.repeat(400)}1`]
  ])('expands the exponent of %j, which is at the magnitude cap', (text, expected) => {
    expect(numberInputDecimal(text)).toBe(expected);
  });

  it.each<[string]>([[''], ['-'], ['.'], ['e3'], ['1,5'], ['1e'], ['0x10'], ['Infinity'], ['1e400'], ['0.001e-399']])('rejects %j', text => {
    expect(numberInputDecimal(text)).toBeUndefined();
  });
});
