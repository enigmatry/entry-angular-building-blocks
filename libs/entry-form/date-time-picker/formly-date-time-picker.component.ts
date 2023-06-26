import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'entry-formly-date-time-picker',
  templateUrl: './formly-date-time-picker.component.html',
  styleUrls: ['./formly-date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyDateTimePickerComponent extends FieldType {
  formControl: UntypedFormControl;
}
