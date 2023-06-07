import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';

@Component({
  templateUrl: './formly-autocomplete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyAutocompleteComponent extends FieldType {
  get control(): UntypedFormControl {
    return this.formControl as UntypedFormControl;
  }
}
