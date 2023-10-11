import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-datepicker-example',
  templateUrl: './datepicker-example.component.html'
})
export class DatepickerExampleComponent {
  fields: FormlyFieldConfig[] = [
    {
      key: 'expiresOn',
      type: 'datepicker',
      className: `entry-expires-on-field entry-datepicker`,
      templateOptions: {
        label: `Expires on`,
        placeholder: `Expires on`,
        description: ``,
        typeFormatDef: { name: 'date' }
      },
      modelOptions: { updateOn: 'blur' },
    },
  ];
}
