import { Directive, ElementRef, Injector, Renderer2, inject, input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { EntryFieldComposition } from './entry-field-composition';
import { EntryFieldFormatDefinition } from './entry-field-format-definition';
import { EntryFieldFormatter, entryFieldFormatterProviders } from './entry-field-formatter';
import { inputKindOf } from './entry-field-input-kind';
import { keepFullSelection } from './keep-full-selection';
import { observeAttribute } from './observe-attribute';
import { observeDefinition } from './observe-definition';

/** Formats and parses a field by an entry-code-generation definition. Temporary: signal forms will replace it. */
@Directive({
  selector: 'input[entryFieldFormat]:not([type=checkbox]):not([type=radio]):not([type=file]), textarea[entryFieldFormat]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EntryFieldFormatDirective, multi: true },
    { provide: NG_VALIDATORS, useExisting: EntryFieldFormatDirective, multi: true },
    entryFieldFormatterProviders
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
  protected readonly composition = new EntryFieldComposition(this.element);
  /** The format to apply. To change it, bind another object: a change inside the bound object is not seen. */
  readonly entryFieldFormatDefinition = input.required<EntryFieldFormatDefinition>();
  private readonly definition = observeDefinition(this.entryFieldFormatDefinition, () => this.composition.refreshWhenIdle(this.refresh));
  private value: unknown = null;
  private focused = false;
  private disabled = false;
  private parseError: { text: string } | null = null;
  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private onValidatorChange: () => void = () => undefined;

  constructor() {
    observeAttribute(this.element, 'readonly', this.renderWhenIdle);
  }

  readonly writeValue = (value: unknown): void => {
    this.value = value;
    this.parseError = null;
    this.composition.supersede();
    this.renderWhenIdle();
  };

  readonly registerOnChange = (callback: (value: unknown) => void): void => {
    this.onChange = callback;
  };

  readonly registerOnTouched = (callback: () => void): void => {
    this.onTouched = callback;
  };

  readonly setDisabledState = (isDisabled: boolean): void => {
    const changes = this.disabled !== isDisabled || this.element.disabled !== isDisabled;
    this.disabled = isDisabled;
    this.renderer.setProperty(this.element, 'disabled', isDisabled);
    if (changes && this.focused) {
      // Browsers differ in whether a disabled field keeps the focus, so the real focus is read when it is enabled.
      this.focused = isDisabled || this.element.matches(':focus');
      this.renderWhenIdle();
    }
  };

  readonly validate = (): ValidationErrors | null => this.parseError ? { entryFieldFormat: this.parseError } : null;

  readonly registerOnValidatorChange = (callback: () => void): void => {
    this.onValidatorChange = callback;
  };

  protected readonly onInput = (): void => {
    if (!this.composition.absorbsInput()) {
      this.parse();
    }
  };

  private readonly parse = (blurPending = false): void => {
    const text = this.element.value;
    const kind = inputKindOf(this.element);
    this.composition.parsed();
    const result = this.formatter.parse(text, this.definition(), kind, kind === 'number' && this.element.validity.badInput);
    this.parseError = 'error' in result ? { text } : null;
    this.value = 'error' in result ? null : result.value;
    // Autofill and late IME input reach a field without focus. Read around onChange: a subscriber may move the focus.
    const unfocused = !blurPending && !this.focused && !this.element.matches(':focus');
    this.onChange(this.value);
    if (unfocused && !this.focused && !this.element.matches(':focus')) {
      this.onBlur();
    }
  };

  protected readonly onFocus = (): void => {
    this.focused = true;
    keepFullSelection(this.element, this.renderWhenIdle);
  };

  protected readonly onBlur = (): void => {
    this.focused = false;
    this.composition.blurWhenIdle(() => {
      this.onTouched();
      this.render();
    });
  };

  protected readonly onCompositionEnd = (): void => this.composition.end({
    refresh: this.refresh, parse: this.parse, publishParseError: this.publishParseError, touch: this.onTouched, render: this.render
  });

  private readonly renderWhenIdle = (): void => this.composition.renderWhenIdle(this.render);

  // Not always parse: reading the field's own rendering in another locale would change the model (1.234 as 1234).
  private readonly refresh = (edited = false, blurPending = false): void => {
    if (edited || this.parseError) {
      this.parse(blurPending);
      this.publishParseError(blurPending);
    }
    this.render();
  };

  // Under updateOn blur or submit Angular does not validate a pending value, so a stale error would stay shown.
  private readonly publishParseError = (blurPending: boolean): void => {
    const control = this.injector.get(NgControl, null, { self: true })?.control;
    // Not when a blur is pending: it commits the value, and validating before it would emit the old value once more.
    const valuePending = control?.updateOn === 'submit' || control?.updateOn === 'blur' && this.focused && !blurPending;
    if (valuePending && control.hasError('entryFieldFormat') && control.getError('entryFieldFormat')?.text !== this.parseError?.text) {
      this.onValidatorChange();
    }
  };

  private readonly render = (): void => {
    if (this.parseError) {
      return;
    }
    const definition = this.definition();
    const kind = inputKindOf(this.element);
    const editing = this.focused && !this.element.readOnly && !this.element.disabled;
    const text = editing || kind !== 'text' ? this.formatter.edit(this.value, definition, kind) : this.formatter.display(this.value, definition);
    this.renderer.setProperty(this.element, 'value', text);
    this.composition.rendered();
  };
}
