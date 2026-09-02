import { ValidationErrors } from '@angular/forms';
import type { ValidationError } from '@angular/forms/signals';
import { EntryDateTimeAdapter } from '@enigmatry/entry-components/common';

export interface TimeOfDay {
  hours: number;
  minutes: number;
  seconds: number;
}

/** Field errors in the shape the validation directive reads. `context` carries the original reactive error value. */
export const toValidationErrors = (
  errors: readonly ValidationError.WithOptionalFieldTree[]
): ValidationErrors | null =>
  errors.length === 0
    ? null
    : Object.fromEntries(errors.map(error => [error.kind, (error as { context?: unknown }).context ?? true]));

/** The date part of `value` with the time zeroed, which is what the calendar's own bounds compare against. */
export const floorToDate = <D>(
  adapter: EntryDateTimeAdapter<D, unknown>,
  value: D | undefined
): D | undefined => {
  if (!value) {
    return undefined;
  }
  const result = adapter.clone(value);
  adapter.setTime(result, 0, 0, 0);
  return result;
};

/** A fresh instance, because `MatDatepickerInput` only reformats its text when it receives a new reference. */
export const withTimeOfDay = <D>(
  adapter: EntryDateTimeAdapter<D, unknown>,
  value: D,
  time: TimeOfDay
): D => {
  const result = adapter.clone(value);
  adapter.setTime(result, time.hours, time.minutes, time.seconds);
  return result;
};
