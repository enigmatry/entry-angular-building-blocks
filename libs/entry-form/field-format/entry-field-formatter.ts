import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, formatNumber } from '@angular/common';
import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldInputKind } from './entry-field-input-kind';
import { groupingSample, negativeSample, numberSyntax, parseLocalizedNumber } from './field-format-numbers';
import { plainNumber, toNumber } from './number-conversion';
import { NumberSyntax } from './number-syntax';
import { fromPercent, toPercent } from './percent-scale';

export type EntryFieldParseResult = { value: unknown } | { error: true };

const sampleDigits = '1.1-1';

const isEmptyValue = (value: unknown): boolean => {
  const normalized = value ?? '';
  return typeof normalized === 'string' && !normalized;
};

const setting = (value: unknown): string | undefined => typeof value === 'string' && value ? value : undefined;

@Injectable()
export class EntryFieldFormatter {
  private readonly localeId = inject(LOCALE_ID);
  private readonly currencyPipe = inject(CurrencyPipe);
  private readonly datePipe = inject(DatePipe);
  private readonly decimalPipe = inject(DecimalPipe);
  private readonly percentPipe = inject(PercentPipe);

  readonly display = (value: unknown, definition: EntryFieldFormatDefinition): string => {
    if (isEmptyValue(value)) {
      return '';
    }
    if (definition.name === 'date') {
      return this.displayDate(value, definition);
    }
    if (definition.name === 'boolean') {
      return value === true ? '\u2713' : '';
    }
    const numeric = toNumber(value);
    if (!this.isNumeric(definition) || !Number.isFinite(numeric)) {
      return String(value);
    }
    return this.displayNumber(numeric, definition);
  };

  readonly edit = (value: unknown, definition: EntryFieldFormatDefinition, kind: EntryFieldInputKind): string => {
    if (isEmptyValue(value)) {
      return '';
    }
    const numeric = kind !== 'native' && (kind === 'number' || this.isNumeric(definition)) ? toNumber(value) : NaN;
    if (!Number.isFinite(numeric)) {
      return String(value);
    }
    const plain = plainNumber(this.isNumeric(definition) ? this.toEditNumber(numeric, definition) : numeric);
    if (kind === 'number') {
      return plain;
    }
    const syntax = this.syntax(definition);
    return plain.replace('-', syntax.minus).replace('.', syntax.decimal);
  };

  readonly parse = (text: string, definition: EntryFieldFormatDefinition, kind: EntryFieldInputKind): EntryFieldParseResult => {
    if (kind === 'native') {
      return { value: text };
    }
    if (kind === 'text' && !this.isNumeric(definition)) {
      return { value: text };
    }
    if (!text.trim()) {
      return { value: null };
    }
    const parsed = kind === 'number' ? toNumber(text) : parseLocalizedNumber(text, this.syntax(definition));
    const value = this.isNumeric(definition) ? this.fromEditNumber(parsed, definition) : parsed;
    return Number.isFinite(value) ? { value } : { error: true };
  };

  private readonly isNumeric = (definition: EntryFieldFormatDefinition): boolean =>
    definition.name === 'number' || definition.name === 'currency' || definition.name === 'percent';

  private readonly locale = (definition: EntryFieldFormatDefinition): string => setting(definition.locale) ?? this.localeId;

  private readonly currencyDisplay = (definition: EntryFieldFormatDefinition): string | boolean =>
    typeof definition.display === 'boolean' ? definition.display : setting(definition.display) ?? 'symbol';

  private readonly multiplier = (definition: EntryFieldFormatDefinition): number => toNumber(definition.multiplier) || 1;

  private readonly displayNumber = (value: number, definition: EntryFieldFormatDefinition): string => {
    const locale = this.locale(definition);
    const digits = setting(definition.digitsInfo);
    switch (definition.name) {
      case 'currency':
        return this.currencyPipe.transform(value, setting(definition.currencyCode), this.currencyDisplay(definition), digits, locale) ?? '';
      case 'percent':
        return this.percentPipe.transform(value * this.multiplier(definition), digits, locale) ?? '';
      default:
        return this.decimalPipe.transform(value, digits, locale) ?? '';
    }
  };

  private readonly toEditNumber = (value: number, definition: EntryFieldFormatDefinition): number =>
    definition.name === 'percent' ? toPercent(value, this.multiplier(definition)) : value;

  private readonly fromEditNumber = (value: number, definition: EntryFieldFormatDefinition): number =>
    definition.name === 'percent' ? fromPercent(value, this.multiplier(definition)) : value;

  private readonly syntax = (definition: EntryFieldFormatDefinition): NumberSyntax => {
    const locale = this.locale(definition);
    const sample = (value: number, display: string | boolean): string => {
      switch (definition.name) {
        case 'currency':
          return this.currencyPipe.transform(value, setting(definition.currencyCode), display, sampleDigits, locale) ?? '';
        case 'percent':
          return this.percentPipe.transform(value, sampleDigits, locale) ?? '';
        default:
          return formatNumber(value, locale, sampleDigits);
      }
    };
    const display = this.currencyDisplay(definition);
    return numberSyntax({
      positive: sample(groupingSample, display),
      negative: sample(-groupingSample, display),
      unlabelledPositive: sample(groupingSample, ''),
      unlabelledNegative: sample(-groupingSample, '')
    }, formatNumber(negativeSample, locale, '1.0-0'));
  };

  private readonly displayDate = (value: unknown, definition: EntryFieldFormatDefinition): string => {
    if (!(value instanceof Date) && typeof value !== 'string' && typeof value !== 'number') {
      return String(value);
    }
    try {
      return this.datePipe.transform(value, setting(definition.format), setting(definition.timezone), this.locale(definition)) ?? '';
    } catch {
      return String(value);
    }
  };
}
