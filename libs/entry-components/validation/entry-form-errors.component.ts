import { Component, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import { EMPTY, switchMap } from 'rxjs';
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
    @let errors = generalErrors;
    @if (errors.length) {
      <div>
        @for (error of errors; track error) {
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

  /** Bumped on every status emission purely to mark this OnPush view dirty. */
  private readonly statusChanged = signal(0);

  /**
   * Form level messages, read live off the bound form on every change detection pass.
   *
   * @remarks A getter rather than a signal holding a copy. `setServerSideValidationErrors` mutates
   * the form in place, and a caller may equally do `form.setErrors({ general: [...] })` with no
   * event at all - so the errors object itself has to be the source of truth, exactly as the
   * previous template's `form.errors['general']` was. The `statusChanged` read is what gets this
   * view re-checked when a status emission is the only thing that happened.
   */
  protected get generalErrors(): string[] {
    this.statusChanged();
    return (this.form().errors?.[FORM_ERROR_KEY] as string[] | undefined) ?? [];
  }

  constructor() {
    toObservable(this.form)
      .pipe(
        // re-subscribe when a different form is bound. The guard covers a caller explicitly binding
        // undefined - throwing here would kill the pipeline for good, because toObservable replays
        // and never re-subscribes.
        switchMap(form => form ? form.statusChanges : EMPTY),
        takeUntilDestroyed()
      )
      .subscribe(() => this.statusChanged.update(count => count + 1));
  }
}
