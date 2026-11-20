import { Directive, ElementRef, Injector, Renderer2, inject, input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { EntryFieldComposition } from './entry-field-composition';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldFormatter, entryFieldFormatterProviders } from './entry-field-formatter';
import { inputKindOf } from './entry-field-input-kind';
import { observeAttribute } from './observe-attribute';
import { observeDefinition } from './observe-definition';

/** Formats an `<input>` or `<textarea>` by an entry-code-generation definition and parses typed text back (see the README).
 * Temporary: a reactive-forms `ControlValueAccessor`, to be replaced by a signal-forms `FormValueControl`. */
@Directive({
  selector: 'input[entryFieldFormat]:not([type=checkbox]):not([type=radio]):not([type=file]), textarea[entryFieldFormat]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EntryFieldFormatDirective, multi: true },
    { provide: NG_VALIDATORS, useExisting: EntryFieldFormatDirective, multi: true },
    entryFieldFormatterProviders
  ],
  host: {
    '(input)': 'onInput($event)',
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
  /** The format to apply, as entry-code-generation renders it from `.WithFormat(...)`. */
  readonly entryFieldFormatDefinition = input.required<EntryFieldFormatDefinition>();
  private value: unknown = null;
  private focused = false;
  private parseError: { text: string } | null = null;
  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private onValidatorChange: () => void = () => undefined;

  constructor() {
    observeDefinition(this.entryFieldFormatDefinition, () => this.composition.deferRefresh() || this.refresh());
    observeAttribute(this.element, 'readonly', this.renderAfterComposition);
  }

  readonly writeValue = (value: unknown): void => {
    this.value = value;
    this.parseError = null;
    this.composition.supersede();
    this.renderAfterComposition();
  };

  readonly registerOnChange = (callback: (value: unknown) => void): void => {
    this.onChange = callback;
  };

  readonly registerOnTouched = (callback: () => void): void => {
    this.onTouched = callback;
  };

  /** A disabled field shows the formatted value. Browsers differ in whether it keeps focus, so that is checked when it is enabled. */
  readonly setDisabledState = (isDisabled: boolean): void => {
    const changes = this.element.disabled !== isDisabled;
    this.renderer.setProperty(this.element, 'disabled', isDisabled);
    if (changes && this.focused) {
      this.focused = isDisabled || this.element.matches(':focus');
      this.renderAfterComposition();
    }
  };

  readonly validate = (): ValidationErrors | null => this.parseError ? { entryFieldFormat: this.parseError } : null;

  readonly registerOnValidatorChange = (callback: () => void): void => {
    this.onValidatorChange = callback;
  };

  protected readonly onInput = (event: Partial<InputEvent>): unknown =>
    this.composition.absorbsInput(this.element.value, /Composition/u.test(event.inputType ?? '')) || this.parse();

  private readonly parse = (): void => {
    const text = this.element.value;
    const kind = inputKindOf(this.element);
    this.composition.parsed(text);
    const result = kind === 'number' && this.element.validity.badInput
      ? { error: true as const }
      : this.formatter.parse(text, this.entryFieldFormatDefinition(), kind);
    this.parseError = 'error' in result ? { text } : null;
    this.value = 'error' in result ? null : result.value;
    this.onChange(this.value);
  };

  protected readonly onFocus = (): void => {
    this.focused = true;
    this.renderAfterComposition();
  };

  protected readonly onBlur = (): void => {
    this.focused = false;
    if (!this.composition.deferBlur()) {
      this.onTouched();
      this.render();
    }
  };

  protected readonly onCompositionEnd = (): void => this.composition.end({
    refresh: this.refresh,
    parse: this.parse,
    publishParseError: this.publishParseError,
    touch: () => this.onTouched(),
    render: this.render,
    text: () => this.element.value
  });

  private readonly renderAfterComposition = (): unknown => this.composition.deferRender() || this.render();

  /** Applies a changed definition: text the user typed is parsed again, an untouched rendering is only rendered again. */
  private readonly refresh = (edited = false, blurPending = false): void => edited || this.parseError ? this.reparse(blurPending) : this.render();

  private readonly reparse = (blurPending = false): void => {
    this.parse();
    if (!this.focused) {
      this.onTouched();
    }
    this.publishParseError(blurPending);
    this.render();
  };

  /** Under `updateOn` blur or submit a reparsed value is not committed yet, so Angular is told to run validate() again. */
  private readonly publishParseError = (blurPending: boolean): void => {
    const control = this.injector.get(NgControl, null, { self: true })?.control;
    const valuePending = control?.updateOn === 'submit' || control?.updateOn === 'blur' && this.focused && !blurPending;
    if (valuePending && control.getError('entryFieldFormat')?.text !== this.parseError?.text) {
      this.onValidatorChange();
    }
  };

  private readonly render = (): void => {
    if (this.parseError) {
      return;
    }
    const definition = this.entryFieldFormatDefinition();
    const kind = inputKindOf(this.element);
    const editing = this.focused && !this.element.readOnly && !this.element.disabled;
    const text = editing || kind !== 'text' ? this.formatter.edit(this.value, definition, kind) : this.formatter.display(this.value, definition);
    this.renderer.setProperty(this.element, 'value', text);
    this.composition.rendered(this.element.value);
  };
}
