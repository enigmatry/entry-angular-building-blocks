import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

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
    <div *ngIf="form.errors">
      <mat-error *ngFor="let error of form.errors.general">
        <span class="mat-body-2">{{error}}</span>
      </mat-error>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class EntryFormErrorsComponent {
  /** A form group for which the validation errors are being displayed. */
  @Input() form: UntypedFormGroup;
}
