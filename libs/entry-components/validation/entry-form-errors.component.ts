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
  /** A form for which the validation errors are being displayed. */
  readonly form = input.required<AbstractControl>();

  /** Flipped on every status emission purely to mark this OnPush view dirty. */
  private readonly statusChanged = signal(false);

  /** Read live off the bound form, not copied into a signal: callers mutate the form's errors in place, sometimes with no event. */
  protected get generalErrors(): string[] {
    this.statusChanged();
    const form = this.form() as AbstractControl | undefined;
    return (form?.errors?.[FORM_ERROR_KEY] as string[] | undefined) ?? [];
  }

  constructor() {
    toObservable(this.form)
      .pipe(
        // The guard covers a caller binding undefined - throwing would kill this pipeline for good, since toObservable never re-subscribes.
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        switchMap(form => form ? form.statusChanges : EMPTY),
        takeUntilDestroyed()
      )
      .subscribe(() => this.statusChanged.update(flag => !flag));
  }
}
