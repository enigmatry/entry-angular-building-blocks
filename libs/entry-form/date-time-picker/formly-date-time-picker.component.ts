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

  // Stays a lifecycle hook. Formly's `required` and `formControl` are plain getters, so an effect
  // would track nothing, and deferring to `afterNextRender` would leave the form valid for a frame -
  // long enough for a consumer reading `form.valid` straight after building it to see the wrong answer.
  ngOnInit(): void {
    if (this.required) {
      this.control.addValidators(Validators.required);
    }
  }
}
