import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-input-example',
    templateUrl: './input-example.component.html',
    standalone: false
})
export class InputExampleComponent {
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      className: `entry-name-field entry-input`,
      templateOptions: {
        label: `Name`,
        placeholder: `Name`
      }
    }
  ];
}
