import { NumberSamples } from './number-samples';
import { NumberSyntax } from './number-syntax';

const significantDigits = 15;
const bidiMarks = /[‎‏؜]/gu;
const digitsOnly = /^\d*$/u;
const typographicApostrophe = '’';

export const groupingSample = 1234567890.5;
export const negativeSample = -1;

export const setting = (value: unknown): string | undefined => typeof value === 'string' && value !== '' ? value : undefined;

export const round = (value: number): number => Number(value.toPrecision(significantDigits));

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

export const toNumber = (value: unknown): number | null => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const normalize = (text: string): string => text
  .replace(bidiMarks, '')
  .replace(/\s+/gu, ' ')
  .trim();

const split = (sample: string, knownCore?: string): { prefix: string; core: string; suffix: string } => {
  const text = normalize(sample);
  if (knownCore !== undefined && knownCore !== '' && text.includes(knownCore)) {
    const start = text.indexOf(knownCore);
    return { prefix: text.slice(0, start).trim(), core: knownCore, suffix: text.slice(start + knownCore.length).trim() };
  }
  const lastDigit = /\d(?=\D*$)/u.exec(text);
  if (lastDigit === null) {
    return { prefix: '', core: text, suffix: '' };
  }
  const firstDigit = text.search(/\d/u);
  return {
    prefix: text.slice(0, firstDigit).trim(),
    core: text.slice(firstDigit, lastDigit.index + 1),
    suffix: text.slice(lastDigit.index + 1).trim()
  };
};

export const numberSyntax = (samples: NumberSamples, minusSample: string): NumberSyntax => {
  const { prefix, core, suffix } = split(samples.positive, split(samples.unlabelledPositive).core);
  const negative = split(samples.negative, split(samples.unlabelledNegative).core);
  const decimal = /(\D)\d$/u.exec(core)?.[1] ?? '.';
  const [integerPart] = core.split(decimal);
  const group = /\D/u.exec(integerPart)?.[0];
  const [primaryGroupSize, secondaryGroupSize = primaryGroupSize] = (group === undefined ? [integerPart] : integerPart.split(group))
    .map(digits => digits.length)
    .reverse();
  return {
    decimal,
    minus: /(\D)1$/u.exec(normalize(minusSample))?.[1] ?? '-',
    group,
    primaryGroupSize,
    secondaryGroupSize,
    prefix,
    suffix,
    negativePrefix: negative.prefix,
    negativeSuffix: negative.suffix
  };
};

const stripNegativePattern = (text: string, syntax: NumberSyntax): string | null => {
  const { negativePrefix, negativeSuffix } = syntax;
  const matches = text.length > negativePrefix.length + negativeSuffix.length
    && text.startsWith(negativePrefix)
    && text.endsWith(negativeSuffix);
  return matches ? text.slice(negativePrefix.length, text.length - negativeSuffix.length).trim() : null;
};

const stripSign = (text: string, syntax: NumberSyntax): { text: string; negative: boolean } => {
  const sign = [syntax.minus, '-'].find(minus => text.startsWith(minus));
  return sign === undefined ? { text, negative: false } : { text: text.slice(sign.length).trim(), negative: true };
};

const stripAffixes = (text: string, syntax: NumberSyntax): { text: string; negative: boolean } => {
  const negativeCore = stripNegativePattern(text, syntax);
  if (negativeCore !== null) {
    return { text: negativeCore, negative: true };
  }
  const signed = stripSign(text, syntax);
  let rest = signed.text;
  if (syntax.prefix !== '' && rest.startsWith(syntax.prefix)) {
    rest = rest.slice(syntax.prefix.length).trim();
  }
  if (syntax.suffix !== '' && rest.endsWith(syntax.suffix)) {
    rest = rest.slice(0, -syntax.suffix.length).trim();
  }
  const inner = signed.negative ? { text: rest, negative: false } : stripSign(rest, syntax);
  return { text: inner.text, negative: signed.negative || inner.negative };
};

const isValidGrouping = (integerPart: string, syntax: NumberSyntax): boolean => {
  if (syntax.group === undefined || !integerPart.includes(syntax.group)) {
    return digitsOnly.test(integerPart);
  }
  const groups = integerPart.split(syntax.group);
  const [first, ...others] = groups;
  const last = others.pop() ?? '';
  return digitsOnly.test(groups.join(''))
    && first.length > 0 && first.length <= syntax.secondaryGroupSize
    && last.length === syntax.primaryGroupSize
    && others.every(middle => middle.length === syntax.secondaryGroupSize);
};

export const parseLocalizedNumber = (text: string, syntax: NumberSyntax): number | null => {
  const typed = syntax.group === typographicApostrophe ? text.replaceAll('\'', typographicApostrophe) : text;
  const { text: core, negative } = stripAffixes(normalize(typed), syntax);
  const [integerPart, fraction = '', ...rest] = core.split(syntax.decimal);
  if (rest.length > 0 || !digitsOnly.test(fraction) || !isValidGrouping(integerPart, syntax) || !/\d/u.test(core)) {
    return null;
  }
  const digits = syntax.group === undefined ? integerPart : integerPart.split(syntax.group).join('');
  const parsed = Number(`${digits || '0'}.${fraction || '0'}`);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return negative ? -parsed : parsed;
};
