import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';

@Component({
    templateUrl: './formly-autocomplete.component.html',
    styleUrl: './formly-autocomplete.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormlyAutocompleteComponent extends FieldType<FormlyFieldConfig> {
  get control(): FormControl {
    return this.formControl as FormControl;
  }
}
