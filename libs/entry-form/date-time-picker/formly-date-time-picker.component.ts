import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'entry-formly-date-time-picker',
  templateUrl: './formly-date-time-picker.component.html',
  styleUrls: ['./formly-date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyDateTimePickerComponent extends FieldType<FormlyFieldConfig> {
  get control(): UntypedFormControl {
    return this.formControl as UntypedFormControl;
  }

  setOpenedDate() {
    const now = new Date();
    now.setSeconds(0);
    this.control.setValue(this.control.value || now);
  }
}
