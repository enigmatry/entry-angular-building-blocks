import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
    templateUrl: './formly-autocomplete.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormlyAutocompleteComponent extends FieldType<FormlyFieldConfig> {
  get control(): UntypedFormControl {
    return this.formControl as UntypedFormControl;
  }
}
