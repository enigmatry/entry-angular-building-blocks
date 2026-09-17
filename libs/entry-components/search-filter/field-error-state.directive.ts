import { Directive, effect, inject, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';

/** Shows a field's error state on a `matInput` that cannot carry `[formField]` and so has no `NgControl`. */
@Directive({
  selector: 'input[matInput][entryFieldErrorState]',
  standalone: false
})
export class FieldErrorStateDirective {
  readonly entryFieldErrorState = input.required<Field<unknown>>();

  private readonly matInput = inject(MatInput, { self: true });
  private readonly errorStateMatcher = inject(ErrorStateMatcher);

  constructor() {
    effect(() => {
      const errorState = this.errorStateMatcher.isSignalErrorState?.(this.entryFieldErrorState()) ?? false;
      if (errorState !== this.matInput.errorState) {
        this.matInput.errorState = errorState;
        // `mat-form-field` re-reads `errorState` only when the control emits here.
        this.matInput.stateChanges.next();
      }
    });
  }
}
