import { FormControl, ValidationErrors } from '@angular/forms';
import type { ValidationError } from '@angular/forms/signals';
import { MatDatepickerInput } from '@angular/material/datepicker';

/** Material prefixes every error a datepicker input raises, which is how the picker's own are told apart. */
const MATERIAL_ERROR_PREFIX = 'matDatepicker';

/**
 * The pair of reactive controls behind the picker's UI, kept in step with the bound field.
 *
 * `MatDatepickerInput` needs a real control to parse, format and validate typed text, and the
 * calendar needs a separate one so its midnight selection can have a time merged in before it counts.
 */
export class EntryDateTimePickerControls<D> {
  readonly display = new FormControl<D | null | undefined>(undefined);
  readonly calendar = new FormControl<D | null | undefined>(undefined);

  private fieldErrors: ValidationErrors | null = null;

  /**
   * The last value the visible field produced, held until the field writes it back.
   *
   * Material recomputes its parse-valid flag on every programmatic write, so echoing a typed value
   * into the input would clear the very parse error that typing raised. The effect that carries the
   * value round is asynchronous, so the echo has to be recognised by value rather than by timing.
   */
  private pendingEcho: { value: D | null | undefined } | undefined;

  constructor(private readonly datepickerInput: () => MatDatepickerInput<D> | undefined) {
    this.display.addValidators(() => this.fieldErrors);
  }

  /** Records what the user typed, so the write coming back around is recognised as an echo. */
  typed(value: D | null | undefined): void {
    this.pendingEcho = { value };
  }

  /** Applies a value that came from the bound field, ignoring the field's echo of a typed one. */
  write(value: D | null | undefined): void {
    if (this.consumeEcho(value)) {
      return;
    }
    // A parse failure means the visible text does not represent this value, so the write has to
    // land even when the control already holds it - that is what clears Material's parse state.
    if (this.hasParseError() || !Object.is(this.display.value, value)) {
      this.display.setValue(value, { emitEvent: false });
    }
    if (!Object.is(this.calendar.value, value)) {
      this.calendar.setValue(value, { emitEvent: false });
    }
  }

  setDisabled(disabled: boolean): void {
    for (const control of [this.display, this.calendar]) {
      if (disabled) {
        control.disable({ emitEvent: false });
      } else {
        control.enable({ emitEvent: false });
      }
    }
  }

  setTouched(touched: boolean): void {
    if (touched) {
      this.display.markAsTouched();
    } else {
      this.display.markAsUntouched();
    }
  }

  /**
   * Reports the bound field's errors as the display control's own, which is what the form field
   * renders. Emits, because the validation directive reads `statusChanges` and a server-side error
   * can arrive without the value changing.
   */
  reportFieldErrors(errors: readonly ValidationError.WithOptionalFieldTree[]): void {
    const reported = errors
      // Material's own keys are excluded so the picker's errors cannot round-trip back into itself.
      .filter(error => !error.kind.startsWith(MATERIAL_ERROR_PREFIX))
      // `context` carries the original reactive error value, which the configured messages read.
      .map(error => [error.kind, (error as { context?: unknown }).context ?? true]);
    this.fieldErrors = reported.length === 0 ? null : Object.fromEntries(reported);
    this.display.updateValueAndValidity();
  }

  /**
   * Re-formats the visible text from `value` and clears a failed parse.
   *
   * Assigning the input's `value` rather than the control's is deliberate: the control path reaches
   * `MatDatepickerInput` through `writeValue`, which reformats only when the reference differs, so
   * resetting an already-empty field would leave unparseable text on screen.
   */
  reset(value: D | null | undefined): void {
    this.pendingEcho = undefined;
    this.write(value);
    const input = this.datepickerInput();
    if (input) {
      input.value = value ?? null;
    }
    this.display.markAsUntouched();
    this.display.updateValueAndValidity();
  }

  private hasParseError(): boolean {
    return Object.keys(this.display.errors ?? {}).some(kind => kind.startsWith(MATERIAL_ERROR_PREFIX));
  }

  private consumeEcho(value: D | null | undefined): boolean {
    const isEcho = this.pendingEcho !== undefined && Object.is(this.pendingEcho.value, value);
    this.pendingEcho = undefined;
    return isEcho;
  }
}
