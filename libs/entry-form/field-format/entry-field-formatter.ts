import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, formatNumber } from '@angular/common';
import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { EntryFieldFormatDef } from './entry-field-format-def';
import { groupingSample, negativeSample, numberSyntax, parseLocalizedNumber, plainNumber, round, setting, toNumber } from './field-format-numbers';
import { NumberSyntax } from './number-syntax';

export type EntryFieldParseResult = { value: unknown } | { error: true };

export type EntryFieldInputKind = 'text' | 'number' | 'native';

const percentScale = 100;
const sampleDigits = '1.1-1';

@Injectable()
export class EntryFieldFormatter {
  private readonly localeId = inject(LOCALE_ID);
  private readonly currencyPipe = inject(CurrencyPipe);
  private readonly datePipe = inject(DatePipe);
  private readonly decimalPipe = inject(DecimalPipe);
  private readonly percentPipe = inject(PercentPipe);

  readonly display = (value: unknown, def: EntryFieldFormatDef): string => {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    const locale = this.locale(def);
    const digitsInfo = setting(def.digitsInfo);
    const numeric = toNumber(value);
    switch (def.name) {
      case 'number':
        return numeric === null ? String(value) : this.decimalPipe.transform(numeric, digitsInfo, locale) ?? '';
      case 'currency':
        return numeric === null
          ? String(value)
          : this.currencyPipe.transform(numeric, setting(def.currencyCode), this.currencyDisplay(def), digitsInfo, locale) ?? '';
      case 'percent':
        return numeric === null ? String(value) : this.percentPipe.transform(numeric * this.multiplier(def), digitsInfo, locale) ?? '';
      case 'date':
        return this.displayDate(value, def);
      case 'boolean':
        return value === true ? '✓' : '';
      default:
        return String(value);
    }
  };

  readonly edit = (value: unknown, def: EntryFieldFormatDef, kind: EntryFieldInputKind): string => {
    if (value === null || value === undefined) {
      return '';
    }
    const numeric = kind !== 'native' && (kind === 'number' || this.isNumeric(def)) ? toNumber(value) : null;
    if (numeric === null) {
      return String(value);
    }
    const plain = plainNumber(this.isNumeric(def) ? this.toEditNumber(numeric, def) : numeric);
    if (kind === 'number') {
      return plain;
    }
    const syntax = this.syntax(def);
    return plain.replace('-', syntax.minus).replace('.', syntax.decimal);
  };

  readonly parse = (text: string, def: EntryFieldFormatDef, kind: EntryFieldInputKind): EntryFieldParseResult => {
    if (kind === 'native') {
      return { value: text };
    }
    if (kind === 'text' && !this.isNumeric(def)) {
      return { value: text };
    }
    if (text.trim() === '') {
      return { value: null };
    }
    const parsed = kind === 'number' ? toNumber(text) : parseLocalizedNumber(text, this.syntax(def));
    const value = parsed === null || !this.isNumeric(def) ? parsed : this.fromEditNumber(parsed, def);
    return value === null || !Number.isFinite(value) ? { error: true } : { value };
  };

  private readonly isNumeric = (def: EntryFieldFormatDef): boolean =>
    def.name === 'number' || def.name === 'currency' || def.name === 'percent';

  private readonly locale = (def: EntryFieldFormatDef): string => setting(def.locale) ?? this.localeId;

  private readonly currencyDisplay = (def: EntryFieldFormatDef): string | boolean =>
    typeof def.display === 'boolean' ? def.display : setting(def.display) ?? 'symbol';

  private readonly multiplier = (def: EntryFieldFormatDef): number => {
    const multiplier = toNumber(def.multiplier);
    return multiplier === null || multiplier === 0 ? 1 : multiplier;
  };

  private readonly toEditNumber = (value: number, def: EntryFieldFormatDef): number =>
    def.name === 'percent' ? round(value * this.multiplier(def) * percentScale) : value;

  private readonly fromEditNumber = (value: number, def: EntryFieldFormatDef): number =>
    def.name === 'percent' ? round(value / percentScale / this.multiplier(def)) : value;

  private readonly syntax = (def: EntryFieldFormatDef): NumberSyntax => {
    const locale = this.locale(def);
    const sample = (value: number, display: string | boolean): string => {
      switch (def.name) {
        case 'currency':
          return this.currencyPipe.transform(value, setting(def.currencyCode), display, sampleDigits, locale) ?? '';
        case 'percent':
          return this.percentPipe.transform(value, sampleDigits, locale) ?? '';
        default:
          return formatNumber(value, locale, sampleDigits);
      }
    };
    const display = this.currencyDisplay(def);
    return numberSyntax({
      positive: sample(groupingSample, display),
      negative: sample(-groupingSample, display),
      unlabelledPositive: sample(groupingSample, ''),
      unlabelledNegative: sample(-groupingSample, '')
    }, formatNumber(negativeSample, locale, '1.0-0'));
  };

  private readonly displayDate = (value: unknown, def: EntryFieldFormatDef): string => {
    if (!(value instanceof Date) && typeof value !== 'string' && typeof value !== 'number') {
      return String(value);
    }
    try {
      return this.datePipe.transform(value, setting(def.format), setting(def.timezone), this.locale(def)) ?? '';
    } catch {
      return String(value);
    }
  };
}
