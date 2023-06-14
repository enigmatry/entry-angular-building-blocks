import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

/**
 * A component used to display back-end validation errors on form level (errors that are not connected to the specific form field).
 *
 * This component will list validation errors one after another, each in separate row.
 *
 * @example
 * ```html
 * <entry-form-errors [form]="myForm"></entry-form-errors>
 * ```
 */
@Component({
  selector: 'entry-form-errors',
  templateUrl: './entry-form-errors.component.html',
  styleUrls: ['./entry-form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EntryFormErrorsComponent {
  @Input() form: UntypedFormGroup;
}
