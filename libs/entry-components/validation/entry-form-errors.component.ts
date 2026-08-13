import { Component, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { EMPTY, startWith, switchMap } from 'rxjs';
import { FORM_ERROR_KEY } from './entry-validation';

/**
 * A component used to display generic (form level) server side validation messages.
 * The messages are displayed as a list, each message in a new row.
 *
 * @example
 * ```html
 * <entry-form-errors [form]="myForm">
 * </entry-form-errors>
 * ```
 */
@Component({
    selector: 'entry-form-errors',
    template: `
    @if (generalErrors().length) {
      <div>
        @for (error of generalErrors(); track error) {
          <mat-error>
            <span class="mat-body-2">{{error}}</span>
          </mat-error>
        }
      </div>
    }
  `,
    standalone: false
})
export class EntryFormErrorsComponent {
  /** A form group for which the validation errors are being displayed. */
  readonly form = input.required<UntypedFormGroup>();

  /**
   * `setServerSideValidationErrors` mutates the bound form in place, so neither the input reference
   * nor the status value is a usable change signal — the status frequently repeats
   * ('INVALID' -> 'INVALID') while the error payload underneath changes.
   *
   * @remarks Compares by content rather than identity. A fresh array arrives on every status
   * emission (including the `[]` below), so default identity equality would repaint on every
   * keystroke in any control of the form, while `equal: () => false` would do the same.
   */
  protected readonly generalErrors = signal<string[]>([], {
    equal: (a, b) => a.length === b.length && a.every((message, index) => message === b[index])
  });

  constructor() {
    toObservable(this.form)
      .pipe(
        // re-subscribe when a different form is bound; seed from the current status so errors
        // already present at bind time render without waiting for the next emission. The guard
        // covers a caller explicitly binding undefined - throwing here would kill the pipeline for
        // good, because toObservable replays and never re-subscribes.
        switchMap(form => form ? form.statusChanges.pipe(startWith(form.status)) : EMPTY),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        const errors = this.form().errors?.[FORM_ERROR_KEY] as string[] | undefined;
        this.generalErrors.set(errors ?? []);
      });
  }
}
