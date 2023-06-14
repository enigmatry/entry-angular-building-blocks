import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FORM_FIELD_ERROR_KEY } from './entry-validation';

/**
 * A component used to display back-end validation errors on field level.
 *
 * This component will list validation errors one after another, each in separate row.
 *
 * @example
 * ```html
 * <entry-form-field-errors [formControl]="myForm.get('Name')"></entry-form-field-errors>
 * ```
 */
@Component({
  selector: 'entry-form-field-errors',
  templateUrl: './entry-form-field-errors.component.html',
  styleUrls: ['./entry-form-field-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryFormFieldErrorsComponent {
  @Input() formControl: AbstractControl;

  errorKey = FORM_FIELD_ERROR_KEY;
}
