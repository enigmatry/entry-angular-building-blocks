import { Component, Input } from '@angular/core';
import { sortOptions } from '@enigmatry/entry-form';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-select-example',
  templateUrl: './select-example.component.html'
})
export class SelectExampleComponent {

  @Input() typeOptions = [
    { value: 0, displayName: `Food` },
    { value: 1, displayName: `Drink` },
    { value: 2, displayName: `Book` },
    { value: 3, displayName: `Car` }
  ];

  single: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'select',
      className: `entry-type-field entry-select`,
      templateOptions: {
        label: `Single`,
        placeholder: `Single`,
        description: ``,
        options: of(this.typeOptions).pipe(map(opts => sortOptions(opts, 'value', 'displayName'))),
        valueProp: 'value',
        labelProp: 'displayName'
      }
    },
  ];

  multi: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'select',
      className: `entry-type-field entry-select`,
      templateOptions: {
        label: `Multi`,
        placeholder: `Multi`,
        description: ``,
        options: of(this.typeOptions).pipe(map(opts => sortOptions(opts, 'value', 'displayName'))),
        valueProp: 'value',
        labelProp: 'displayName',
        multiple: true
      }
    },
  ];

  autocomplete: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'autocomplete',
      className: `entry-type-field entry-autocomplete`,
      templateOptions: {
        label: `Autocomplete`,
        placeholder: `Autocomplete`,
        description: ``,
        options: of(this.typeOptions).pipe(map(opts => sortOptions(opts, 'value', 'displayName'))),
        valueProp: 'value',
        labelProp: 'displayName'
      }
    },
  ];
}
