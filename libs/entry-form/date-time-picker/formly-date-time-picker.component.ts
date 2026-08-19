import { afterNextRender, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
    selector: 'entry-formly-date-time-picker',
    templateUrl: './formly-date-time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormlyDateTimePickerComponent extends FieldType<FormlyFieldConfig> {
  get control(): FormControl {
    return this.formControl as FormControl;
  }

  constructor() {
    super();
    // Replaces ngOnInit. Not an effect: Formly's `required` and `formControl` are plain getters, so
    // an effect would track nothing and merely be a deferred one-shot dressed up as reactive code -
    // and flipping validity from inside change detection risks the classic changed-after-checked
    // error in dev mode. Running after the render keeps the validator arriving late but makes the
    // revalidation explicit.
    afterNextRender(() => {
      if (this.required) {
        this.control.addValidators(Validators.required);
        // emits deliberately: statusChanges is the only data path entry-form-errors and
        // entryDisplayControlValidation have, so a silent flip to INVALID would never render
        this.control.updateValueAndValidity();
      }
    });
  }
}
