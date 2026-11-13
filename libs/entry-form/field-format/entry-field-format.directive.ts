import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Directive, ElementRef, Renderer2, effect, inject, input, untracked } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldFormatter } from './entry-field-formatter';
import { EntryFieldInputKind, inputKindOf } from './entry-field-input-kind';

const isAndroid = (): boolean => typeof navigator !== 'undefined' && /android (\d+)/iu.test(navigator.userAgent);

/**
 * Formats an `<input matInput>` or `<textarea matInput>` per an entry-code-generation definition and parses input back.
 *
 * - `number`, `currency` and `percent` show the formatted value while not focused and a plain locale-aware number
 *   while focused; invalid text sets a `null` value and the `entryFieldFormat` validation error.
 * - `date`, `boolean` and custom definitions format the displayed value only; typed text is written unchanged.
 * - Only text-like inputs are formatted. `number` and `range` inputs show and parse a plain number, other native
 *   types keep their raw value, and checkbox, radio and file inputs keep Angular's own value accessors.
 *
 * Temporary: a reactive-forms `ControlValueAccessor` for generated forms, to be replaced by a `FormValueControl`
 * built on `transformedValue` when generated forms migrate to signal forms.
 */
@Directive({
  selector: 'input[entryFieldFormat]:not([type=checkbox]):not([type=radio]):not([type=file]), textarea[entryFieldFormat]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EntryFieldFormatDirective, multi: true },
    { provide: NG_VALIDATORS, useExisting: EntryFieldFormatDirective, multi: true },
    EntryFieldFormatter,
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    PercentPipe
  ],
  host: {
    '(input)': 'onInput()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(compositionstart)': 'onCompositionStart()',
    '(compositionend)': 'onCompositionEnd()'
  }
})
export class EntryFieldFormatDirective implements ControlValueAccessor, Validator {
  private readonly element = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly formatter = inject(EntryFieldFormatter);
  private readonly compositionBuffered = inject(COMPOSITION_BUFFER_MODE, { optional: true }) ?? !isAndroid();

  readonly entryFieldFormatDefinition = input.required<EntryFieldFormatDefinition>();

  private value: unknown = null;
  private focused = false;
  private composing = false;
  private parseError: { text: string } | null = null;
  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private onValidatorChange: () => void = () => undefined;

  constructor() {
    effect(() => {
      this.entryFieldFormatDefinition();
      untracked(() => this.refresh());
    });
  }

  readonly writeValue = (value: unknown): void => {
    this.value = value;
    this.parseError = null;
    this.render();
  };

  readonly registerOnChange = (callback: (value: unknown) => void): void => {
    this.onChange = callback;
  };

  readonly registerOnTouched = (callback: () => void): void => {
    this.onTouched = callback;
  };

  readonly setDisabledState = (isDisabled: boolean): void => {
    this.renderer.setProperty(this.element, 'disabled', isDisabled);
  };

  readonly validate = (): ValidationErrors | null => this.parseError ? { entryFieldFormat: this.parseError } : null;

  readonly registerOnValidatorChange = (callback: () => void): void => {
    this.onValidatorChange = callback;
  };

  protected readonly onInput = (): void => {
    if (this.compositionBuffered && this.composing) {
      return;
    }
    const text = this.element.value;
    const kind = this.inputKind();
    const result = kind === 'number' && this.element.validity.badInput
      ? { error: true as const }
      : this.formatter.parse(text, this.entryFieldFormatDefinition(), kind);
    this.parseError = 'error' in result ? { text } : null;
    this.value = 'error' in result ? null : result.value;
    this.onChange(this.value);
  };

  protected readonly onFocus = (): void => {
    this.focused = true;
    this.render();
  };

  protected readonly onBlur = (): void => {
    this.focused = false;
    this.onTouched();
    this.render();
  };

  protected readonly onCompositionStart = (): void => {
    this.composing = true;
  };

  protected readonly onCompositionEnd = (): void => {
    this.composing = false;
    if (this.compositionBuffered) {
      this.onInput();
    }
  };

  private readonly refresh = (): void => {
    if (!this.parseError) {
      this.render();
      return;
    }
    this.onInput();
    if (!this.focused) {
      this.onTouched();
    }
    this.onValidatorChange();
    this.render();
  };

  private readonly render = (): void => {
    if (this.parseError) {
      return;
    }
    const definition = this.entryFieldFormatDefinition();
    const kind = this.inputKind();
    const text = this.focused || kind !== 'text'
      ? this.formatter.edit(this.value, definition, kind)
      : this.formatter.display(this.value, definition);
    this.renderer.setProperty(this.element, 'value', text);
  };

  private readonly inputKind = (): EntryFieldInputKind => inputKindOf(this.element);
}
