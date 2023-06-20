import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * A component used to display back-end validation errors on field level.
 *
 * This component will list validation errors one after another, each in separate row.
 *
 * @example
 * ```html
 * <entry-form-field-errors [fieldControl]="myForm.get('Name')"></entry-form-field-errors>
 * ```
 */
@Component({
  selector: 'entry-form-field-errors',
  templateUrl: './entry-form-field-errors.component.html',
  styleUrls: ['./entry-form-field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EntryFormFieldErrorsComponent {
  @Input() fieldControl: AbstractControl;
}
