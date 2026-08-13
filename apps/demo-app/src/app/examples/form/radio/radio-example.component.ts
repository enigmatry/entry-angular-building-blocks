import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';

@Component({
    selector: 'app-radio-example',
    templateUrl: './radio-example.component.html',
    standalone: false
})
export class RadioExampleComponent {
  readonly typeOptions = [
    { value: 0, displayName: `Food` },
    { value: 1, displayName: `Drink` },
    { value: 2, displayName: `Book` },
    { value: 3, displayName: `Car` }
  ];

  fields: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'radio',
      className: `entry-type-field entry-radio`,
      templateOptions: {
        label: `Type`,
        placeholder: `Type`,
        description: ``,
        options: of(this.typeOptions),
        valueProp: 'value',
        labelProp: 'displayName'
      }
    }
  ];
}
