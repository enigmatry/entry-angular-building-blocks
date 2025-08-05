import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-textarea-example',
    templateUrl: './textarea-example.component.html',
    standalone: false
})
export class TextareaExampleComponent {
  fields: FormlyFieldConfig[] = [
    {
      key: 'description',
      type: 'textarea',
      className: `entry-description-field entry-textarea`,
      templateOptions: {
        label: `Description`,
        placeholder: `Description`,
        description: ``,
        rows: 2,
        cols: 0,
        autosize: false,
        autosizeMinRows: 0,
        autosizeMaxRows: 0
      }
    }
  ];
}
