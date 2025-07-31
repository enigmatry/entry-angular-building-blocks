import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-date-time-picker-example',
    templateUrl: './date-time-picker-example.component.html',
    standalone: false
})
export class DateTimePickerExampleComponent {
  fields: FormlyFieldConfig[] = [
    {
      key: 'expiresOn',
      type: 'datetimepicker',
      className: `entry-expires-on-field entry-datepicker`,
      templateOptions: {
        label: `Expires on`,
        placeholder: `Expires on`,
        description: ``,
        typeFormatDef: { name: 'date' }
      },
      modelOptions: { updateOn: 'blur' }
    }
  ];
}
