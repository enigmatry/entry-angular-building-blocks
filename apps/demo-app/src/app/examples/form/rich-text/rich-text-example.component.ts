import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-rich-text-example',
  templateUrl: './rich-text-example.component.html'
})
export class RichTextExampleComponent {
  model = { description: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'description',
      type: 'ckeditor',
      className: `entry-description-field entry-ckeditor`,
      templateOptions: {
        label: `Description`,
        placeholder: `Description`,
        description: ``,
        required: false
      }
    }
  ];
}
