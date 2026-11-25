import { describe, expect, it } from 'vitest';
import { numberSyntax, parseLocalizedDecimal } from './field-format-numbers';

const english = numberSyntax({
  positive: '$1,234,567,890.5',
  negative: '-$1,234,567,890.5',
  unlabelledPositive: '1,234,567,890.5',
  unlabelledNegative: '-1,234,567,890.5'
}, '-1');

const accounting = numberSyntax({
  positive: '$1,234,567,890.5',
  negative: '($1,234,567,890.5)',
  unlabelledPositive: '1,234,567,890.5',
  unlabelledNegative: '(1,234,567,890.5)'
}, '-1');

describe('parseLocalizedDecimal', () => {
  it.each<[string, string]>([
    ['1,234.5', '1234.5'],
    ['$1,234.5', '1234.5'],
    ['-$5', '-5'],
    ['- 5', '-5'],
    ['$ - 5', '-5'],
    ['.5', '0.5'],
    ['5.', '5']
  ])('reads %j as %s', (text, expected) => {
    expect(parseLocalizedDecimal(text, english)).toBe(expected);
  });

  it.each<[string]>([[',234'], ['1,23'], ['1,2345'], ['.'], ['-'], ['$'], ['1.2.3'], ['--5']])('rejects %j', text => {
    expect(parseLocalizedDecimal(text, english)).toBeUndefined();
  });

  it.each<[string, string | undefined]>([
    ['($5)', '-5'],
    ['($1,234.5)', '-1234.5'],
    ['$5', '5'],
    ['(5)', undefined]
  ])('reads %j in a locale that writes a negative amount in parentheses as %s', (text, expected) => {
    expect(parseLocalizedDecimal(text, accounting)).toBe(expected);
  });
});
