/* eslint-disable max-len */
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-input-example',
  templateUrl: './input-example.component.html'
})
export class InputExampleComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      className: `entry-name-field entry-input`,
      templateOptions: {
        label: `Name`,
        placeholder: `Unique name`,
        description: ``
      }
    }
  ];
}
