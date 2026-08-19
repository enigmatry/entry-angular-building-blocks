import { Component, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
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
  /**
   * A form for which the validation errors are being displayed. Typed as `AbstractControl` so that
   * a `FormGroup` with known keys and a `FormRecord` with dynamic ones are both accepted.
   */
  readonly form = input.required<AbstractControl>();

  /** Flipped on every status emission purely to mark this OnPush view dirty. */
  private readonly statusChanged = signal(false);

  /**
   * Form level messages, read live off the bound form rather than copied into a signal:
   * `setServerSideValidationErrors` mutates the form in place, and a caller may equally do
   * `form.setErrors({ general: [...] })` with no event at all.
   */
  protected get generalErrors(): string[] {
    this.statusChanged();
    const form = this.form() as AbstractControl | undefined;
    return (form?.errors?.[FORM_ERROR_KEY] as string[] | undefined) ?? [];
  }

  constructor() {
    toObservable(this.form)
      .pipe(
        // The guard covers a caller binding undefined - throwing here would kill the pipeline for
        // good, because toObservable replays and never re-subscribes.
        switchMap(form => form ? form.statusChanges : EMPTY),
        takeUntilDestroyed()
      )
      .subscribe(() => this.statusChanged.update(flag => !flag));
  }
}
