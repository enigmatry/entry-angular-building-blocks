import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { EntryFieldFormatDef } from './entry-field-format-def';
import { EntryFieldFormatter, EntryFieldInputKind } from './entry-field-formatter';

const textTypes = new Set(['text', 'search', 'tel', 'url', 'email', 'textarea']);

const isAndroid = (): boolean => typeof navigator !== 'undefined' && /android (\d+)/iu.test(navigator.userAgent);

/**
 * Formats the value of an `<input matInput>` or `<textarea matInput>` according to an entry-code-generation
 * formatter definition, and parses what the user types back into the model value.
 *
 * - `number`, `currency` and `percent` show the formatted value while the field is not focused and a plain,
 *   locale-aware number while it is, and parse typed text back to a number. Text that is not a valid number
 *   in the locale sets the `entryFieldFormat` validation error and a `null` model value.
 * - `date`, `boolean` and custom definitions format the displayed value only; typed text is written to the
 *   model unchanged.
 * - Only text-like inputs (`text`, `search`, `tel`, `url`, `email`, textarea) are formatted. A `type="number"`
 *   input shows and parses a plain number; other native types (`date`, `time`, ...) keep their raw value.
 *
 * Temporary: a reactive-forms `ControlValueAccessor` for generated forms. When generated forms migrate to
 * signal forms it will be replaced by a `FormValueControl` built on `transformedValue`.
 */
@Directive({
  selector: 'input[entryFieldFormat], textarea[entryFieldFormat]',
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

  readonly entryFieldFormatDef = input.required<EntryFieldFormatDef>();

  private value: unknown = null;
  private focused = false;
  private composing = false;
  private invalidText: string | null = null;
  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor() {
    effect(() => this.render());
  }

  readonly writeValue = (value: unknown): void => {
    this.value = value;
    this.invalidText = null;
    this.render();
  };

  readonly registerOnChange = (fn: (value: unknown) => void): void => {
    this.onChange = fn;
  };

  readonly registerOnTouched = (fn: () => void): void => {
    this.onTouched = fn;
  };

  readonly setDisabledState = (isDisabled: boolean): void => {
    this.renderer.setProperty(this.element, 'disabled', isDisabled);
  };

  readonly validate = (): ValidationErrors | null =>
    this.invalidText === null ? null : { entryFieldFormat: { text: this.invalidText } };

  protected readonly onInput = (): void => {
    if (this.compositionBuffered && this.composing) {
      return;
    }
    const text = this.element.value;
    const kind = this.inputKind();
    const result = kind === 'number' && this.element.validity.badInput
      ? { error: true as const }
      : this.formatter.parse(text, this.entryFieldFormatDef(), kind);
    this.invalidText = 'error' in result ? text : null;
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

  private readonly render = (): void => {
    const def = this.entryFieldFormatDef();
    if (this.invalidText !== null) {
      return;
    }
    const kind = this.inputKind();
    const text = this.focused || kind !== 'text'
      ? this.formatter.edit(this.value, def, kind)
      : this.formatter.display(this.value, def);
    this.renderer.setProperty(this.element, 'value', text);
  };

  private readonly inputKind = (): EntryFieldInputKind => {
    const type = this.element.type;
    if (type === 'number') {
      return 'number';
    }
    return textTypes.has(type) ? 'text' : 'native';
  };
}
