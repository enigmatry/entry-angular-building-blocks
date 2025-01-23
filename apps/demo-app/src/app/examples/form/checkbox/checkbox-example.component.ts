import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-checkbox-example',
    templateUrl: './checkbox-example.component.html',
    standalone: false
})
export class CheckboxExampleComponent {
  fields: FormlyFieldConfig[] = [
    {
      key: 'freeShipping',
      type: 'checkbox',
      className: `entry-free-shipping-field entry-checkbox`,
      defaultValue: true,
      templateOptions: {
        label: `Free shipping`,
        placeholder: `Free shipping`,
        description: ``,
        typeFormatDef: { name: 'boolean' }
      },
    }
  ];
}
