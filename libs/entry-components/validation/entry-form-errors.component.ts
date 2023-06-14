import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * A component used to display back-end validation errors on form level (errors that are not connected to the specific form field).
 *
 * This component will list validation errors one after another, each in separate row.
 */
@Component({
  selector: 'entry-form-errors',
  templateUrl: './entry-form-errors.component.html',
  styleUrls: ['./entry-form-errors.component.scss']
})
export class EntryFormErrorsComponent {
  @Input() form: FormGroup;
}
