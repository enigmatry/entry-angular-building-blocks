import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
    selector: 'entry-formly-date-time-picker',
    templateUrl: './formly-date-time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormlyDateTimePickerComponent extends FieldType<FormlyFieldConfig> implements OnInit {
  get control(): FormControl {
    return this.formControl as FormControl;
  }

  // Stays a lifecycle hook: Formly's `required` is a plain getter an effect cannot track, and after-render would leave the form valid for a frame.
  ngOnInit(): void {
    if (this.required) {
      this.control.addValidators(Validators.required);
    }
  }
}
