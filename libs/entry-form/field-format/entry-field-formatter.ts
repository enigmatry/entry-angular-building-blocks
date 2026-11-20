import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, formatNumber } from '@angular/common';
import { Injectable, LOCALE_ID, Provider, inject } from '@angular/core';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldInputKind } from './entry-field-input-kind';
import { groupingSample, negativeSample, numberSyntax, parseLocalizedDecimal } from './field-format-numbers';
import { numberInputDecimal, plainNumber, toNumber } from './number-conversion';
import { NumberSyntax } from './number-syntax';
import { percentDisplayValue, percentEditText, percentModel, percentModelText } from './percent-scale';

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
    const shown = this.displayNumber(numeric, definition);
    const decimal = parseLocalizedDecimal(shown, this.syntax(definition));
    return decimal && this.isExact(decimal, definition) ? shown : this.edit(numeric, definition, 'text');
  };

  readonly edit = (value: unknown, definition: EntryFieldFormatDefinition, kind: EntryFieldInputKind): string => {
    if (isEmptyValue(value)) {
      return '';
    }
    const numeric = kind !== 'native' && (kind === 'number' || this.isNumeric(definition)) ? toNumber(value) : NaN;
    if (!Number.isFinite(numeric)) {
      return String(value);
    }
    const plain = definition.name === 'percent' ? percentEditText(numeric, this.multiplier(definition)) : plainNumber(numeric);
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
    const decimal = kind === 'number' ? numberInputDecimal(text) : parseLocalizedDecimal(text, this.syntax(definition));
    if (!decimal) {
      return { error: true };
    }
    const value = definition.name === 'percent' ? percentModel(decimal, this.multiplier(definition)) : Number(decimal);
    const keepsAmount = Number.isFinite(value) && (value !== 0 || decimal === '0');
    return keepsAmount && this.isExact(decimal, definition) ? { value } : { error: true };
  };

  private readonly isExact = (decimal: string, definition: EntryFieldFormatDefinition): boolean => {
    const exactText = definition.name === 'percent' ? percentModelText(decimal, this.multiplier(definition)) ?? decimal : decimal;
    return plainNumber(Number(exactText)) === exactText;
  };

  private readonly isNumeric = (definition: EntryFieldFormatDefinition): boolean =>
    definition.name === 'number' || definition.name === 'currency' || definition.name === 'percent';

  private readonly locale = (definition: EntryFieldFormatDefinition): string => setting(definition.locale) ?? this.localeId;

  private readonly currencyDisplay = (definition: EntryFieldFormatDefinition): string | boolean =>
    typeof definition.display === 'boolean' ? definition.display : setting(definition.display) ?? 'symbol';

  private readonly multiplier = (definition: EntryFieldFormatDefinition): number => {
    const multiplier = toNumber(definition.multiplier);
    return Number.isNaN(multiplier) ? 1 : multiplier;
  };

  private readonly displayNumber = (value: number, definition: EntryFieldFormatDefinition): string => {
    const locale = this.locale(definition);
    const digits = setting(definition.digitsInfo);
    switch (definition.name) {
      case 'currency':
        return this.currencyPipe.transform(value, setting(definition.currencyCode), this.currencyDisplay(definition), digits, locale) ?? '';
      case 'percent':
        return this.percentPipe.transform(percentDisplayValue(value, this.multiplier(definition)), digits, locale) ?? '';
      default:
        return this.decimalPipe.transform(value, digits, locale) ?? '';
    }
  };

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

/** The formatter with the Angular pipes it formats through, provided per directive. */
export const entryFieldFormatterProviders: Provider[] = [EntryFieldFormatter, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe];
