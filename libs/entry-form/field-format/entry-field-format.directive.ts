import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Directive, ElementRef, Injector, Renderer2, effect, inject, input, untracked } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { EntryFieldComposition } from './entry-field-composition';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldFormatter } from './entry-field-formatter';
import { inputKindOf } from './entry-field-input-kind';
import { observeAttribute } from './observe-attribute';

/** Formats an `<input>` or `<textarea>` by an entry-code-generation definition and parses typed text back (see the README).
 * Temporary: a reactive-forms `ControlValueAccessor`, to be replaced by a signal-forms `FormValueControl`. */
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
    '(compositionstart)': 'composition.start()',
    '(compositionend)': 'onCompositionEnd()'
  }
})
export class EntryFieldFormatDirective implements ControlValueAccessor, Validator {
  private readonly element = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly injector = inject(Injector);
  private readonly formatter = inject(EntryFieldFormatter);
  protected readonly composition = new EntryFieldComposition();
  readonly entryFieldFormatDefinition = input.required<EntryFieldFormatDefinition>();
  private value: unknown = null;
  private focused = false;
  private parseError: { text: string } | null = null;
  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private onValidatorChange: () => void = () => undefined;

  constructor() {
    effect(() => {
      this.entryFieldFormatDefinition();
      untracked(() => this.composition.deferRefresh() || this.refresh());
    });
    observeAttribute(this.element, 'readonly', () => this.composition.deferRender() || this.render());
  }

  readonly writeValue = (value: unknown): void => {
    this.value = value;
    this.parseError = null;
    this.composition.supersede();
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
    if (this.composition.buffered && this.composition.isActive()) {
      return;
    }
    this.composition.inputParsed();
    const text = this.element.value;
    const kind = inputKindOf(this.element);
    const result = kind === 'number' && this.element.validity.badInput
      ? { error: true as const }
      : this.formatter.parse(text, this.entryFieldFormatDefinition(), kind);
    this.parseError = 'error' in result ? { text } : null;
    this.value = 'error' in result ? null : result.value;
    this.onChange(this.value);
  };

  protected readonly onFocus = (): void => {
    this.focused = true;
    if (!this.composition.deferRender()) {
      this.render();
    }
  };

  protected readonly onBlur = (): void => {
    this.focused = false;
    if (!this.composition.deferBlur()) {
      this.onTouched();
      this.render();
    }
  };

  protected readonly onCompositionEnd = (): void => {
    const pending = this.composition.end();
    if (pending.refresh && !pending.superseded) {
      this.reparse(pending.blur);
    } else if (this.composition.buffered && !pending.superseded) {
      this.onInput();
    }
    if (pending.blur) {
      this.onTouched();
    }
    if (pending.blur || pending.render || pending.superseded) {
      this.render();
    }
  };

  private readonly refresh = (): void => this.parseError ? this.reparse() : this.render();

  private readonly reparse = (blurPending = false): void => {
    const previousErrorText = this.parseError?.text;
    this.onInput();
    if (!this.focused) {
      this.onTouched();
    }
    const updateOn = this.injector.get(NgControl, null, { self: true })?.control?.updateOn;
    const valuePending = updateOn === 'submit' || updateOn === 'blur' && this.focused && !blurPending;
    if (valuePending && previousErrorText !== this.parseError?.text) {
      this.onValidatorChange();
    }
    this.render();
  };

  private readonly render = (): void => {
    if (this.parseError) {
      return;
    }
    const definition = this.entryFieldFormatDefinition();
    const kind = inputKindOf(this.element);
    const editing = this.focused && !this.element.readOnly;
    const text = editing || kind !== 'text' ? this.formatter.edit(this.value, definition, kind) : this.formatter.display(this.value, definition);
    this.renderer.setProperty(this.element, 'value', text);
  };
}
