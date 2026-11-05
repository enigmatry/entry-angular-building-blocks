import { DoCheck, Directive, effect, inject, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInput } from '@angular/material/input';

/** Shows a field's error state on a `matInput` that cannot carry `[formField]` and so has no `NgControl`. */
@Directive({
  selector: 'input[matInput][entryFieldErrorState]',
  standalone: false
})
export class FieldErrorStateDirective implements DoCheck {
  private readonly matInput = inject(MatInput, { self: true });
  private readonly errorStateMatcher = inject(ErrorStateMatcher);

  /** The field whose error state this input shows. */
  readonly entryFieldErrorState = input.required<Field<unknown>>();

  constructor() {
    effect(() => this.applyErrorState(this.entryFieldErrorState()));
  }

  // MatInput re-runs its matcher on every check, so a matcher reading state outside the field is picked up here too.
  ngDoCheck(): void {
    this.applyErrorState(this.entryFieldErrorState());
  }

  private readonly applyErrorState = (field: Field<unknown>): void => {
    const errorState = this.currentErrorState(field);
    if (errorState !== this.matInput.errorState) {
      this.matInput.errorState = errorState;
      // `mat-form-field` re-reads `errorState` only when the control emits here.
      this.matInput.stateChanges.next();
    }
  };

  // Material's tracker hands a classic-only matcher a null control for every `[formField]` input; the same here.
  private readonly currentErrorState = (field: Field<unknown>): boolean => {
    if (this.errorStateMatcher.isSignalErrorState) {
      return this.errorStateMatcher.isSignalErrorState(field);
    }
    return this.errorStateMatcher.isErrorState(null, null);
  };
}
