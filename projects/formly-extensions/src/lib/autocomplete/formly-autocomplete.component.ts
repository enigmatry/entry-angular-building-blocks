import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'enigmatry-formly-autocomplete',
  templateUrl: './formly-autocomplete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyAutocompleteComponent extends FieldType {
  get control(): FormControl {
    return this.formControl as FormControl;
  }
}
