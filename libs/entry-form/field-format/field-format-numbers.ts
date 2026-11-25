import { decimalText } from './number-conversion';
import { NumberSamples } from './number-samples';
import { NumberSyntax } from './number-syntax';

const bidirectionalMarks = /[\u200e\u200f\u061c]/gu;
const spaceSeparators = /[\u00a0\u2007\u2009\u202f]/gu;
const digitsOnly = /^\d*$/u;
const typographicApostrophe = '\u2019';

export const groupingSample = 1234567890.5;
export const negativeSample = -1;

const normalize = (text: string): string => text
  .replace(bidirectionalMarks, '')
  .replace(spaceSeparators, ' ')
  .trim();

const split = (sample: string, knownCore?: string): { prefix: string; core: string; suffix: string } => {
  const text = normalize(sample);
  if (knownCore && text.includes(knownCore)) {
    const start = text.indexOf(knownCore);
    return { prefix: text.slice(0, start).trim(), core: knownCore, suffix: text.slice(start + knownCore.length).trim() };
  }
  const lastDigit = /\d(?=\D*$)/u.exec(text);
  if (!lastDigit) {
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
  const [primaryGroupSize, secondaryGroupSize = primaryGroupSize] = (group ? integerPart.split(group) : [integerPart])
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

const stripNegativePattern = (text: string, syntax: NumberSyntax): string | undefined => {
  const { negativePrefix, negativeSuffix } = syntax;
  const matches = text.length > negativePrefix.length + negativeSuffix.length
    && text.startsWith(negativePrefix)
    && text.endsWith(negativeSuffix);
  return matches ? text.slice(negativePrefix.length, text.length - negativeSuffix.length).trim() : undefined;
};

const stripSign = (text: string, syntax: NumberSyntax): { text: string; negative: boolean } => {
  const sign = [syntax.minus, '-'].find(minus => text.startsWith(minus));
  return sign ? { text: text.slice(sign.length).trim(), negative: true } : { text, negative: false };
};

const stripAffixes = (text: string, syntax: NumberSyntax): { text: string; negative: boolean } => {
  const negativeCore = stripNegativePattern(text, syntax);
  if (negativeCore) {
    return { text: negativeCore, negative: true };
  }
  const signed = stripSign(text, syntax);
  let rest = signed.text;
  if (syntax.prefix && rest.startsWith(syntax.prefix)) {
    rest = rest.slice(syntax.prefix.length).trim();
  }
  if (syntax.suffix && rest.endsWith(syntax.suffix)) {
    rest = rest.slice(0, -syntax.suffix.length).trim();
  }
  const inner = signed.negative ? { text: rest, negative: false } : stripSign(rest, syntax);
  return { text: inner.text, negative: signed.negative || inner.negative };
};

const isValidGrouping = (integerPart: string, syntax: NumberSyntax): boolean => {
  if (!syntax.group || !integerPart.includes(syntax.group)) {
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

const parseCore = ({ text, negative }: { text: string; negative: boolean }, syntax: NumberSyntax): string | undefined => {
  const amount = syntax.group === typographicApostrophe ? text.replaceAll('\'', typographicApostrophe) : text;
  const [integerPart, fraction = '', ...rest] = amount.split(syntax.decimal);
  if (rest.length > 0 || !digitsOnly.test(fraction) || !isValidGrouping(integerPart, syntax) || !/\d/u.test(amount)) {
    return undefined;
  }
  const digits = syntax.group ? integerPart.split(syntax.group).join('') : integerPart;
  return decimalText(negative, digits, fraction);
};

export const parseLocalizedDecimal = (text: string, syntax: NumberSyntax): string | undefined => {
  const normalized = normalize(text);
  return parseCore(stripSign(normalized, syntax), syntax) ?? parseCore(stripAffixes(normalized, syntax), syntax);
};
