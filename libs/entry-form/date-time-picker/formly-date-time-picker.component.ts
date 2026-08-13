import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
    selector: 'entry-formly-date-time-picker',
    templateUrl: './formly-date-time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormlyDateTimePickerComponent extends FieldType<FormlyFieldConfig> {
  get control(): UntypedFormControl {
    return this.formControl as UntypedFormControl;
  }

  constructor() {
    super();
    // Replaces ngOnInit. Formly's `required` is not signal-backed, so this runs once; the explicit
    // revalidation covers the validator arriving after the control's first validation pass.
    effect(() => {
      if (this.required) {
        this.control.addValidators(Validators.required);
        this.control.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
}
