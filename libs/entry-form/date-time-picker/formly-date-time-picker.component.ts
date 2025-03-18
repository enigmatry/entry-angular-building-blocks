import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
    selector: 'entry-formly-date-time-picker',
    templateUrl: './formly-date-time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormlyDateTimePickerComponent extends FieldType<FormlyFieldConfig> implements OnInit {

  get control(): UntypedFormControl {
    return this.formControl as UntypedFormControl;
  }

  ngOnInit(): void {
    if (this.required) {
      this.control.addValidators(Validators.required);
    }
  }
}
