import { Directive, effect, inject, input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormField } from '@angular/forms/signals';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';

/** Shows a field's error state on a `matInput` that cannot carry `[formField]` and so has no `NgControl`. */
@Directive({
  selector: 'input[matInput][entryFieldErrorState]',
  standalone: false
})
export class FieldErrorStateDirective {
  private readonly matInput = inject(MatInput, { self: true });
  private readonly errorStateMatcher = inject(ErrorStateMatcher);

  /** The `[formField]` binding whose field this input shows the error state of. */
  readonly entryFieldErrorState = input.required<FormField<unknown>>();

  constructor() {
    effect(() => {
      const errorState = this.currentErrorState(this.entryFieldErrorState());
      if (errorState !== this.matInput.errorState) {
        this.matInput.errorState = errorState;
        // `mat-form-field` re-reads `errorState` only when the control emits here.
        this.matInput.stateChanges.next();
      }
    });
  }

  // Material's own tracker falls back the same way: a matcher written before signal forms has only `isErrorState`.
  private readonly currentErrorState = (formField: FormField<unknown>): boolean => {
    if (this.errorStateMatcher.isSignalErrorState) {
      return this.errorStateMatcher.isSignalErrorState(formField.field());
    }
    const control = formField.injector.get(NgControl, null, { self: true })?.control ?? null;
    return this.errorStateMatcher.isErrorState(control, null);
  };
}
