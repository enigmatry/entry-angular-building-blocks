import { Component } from '@angular/core';
import { sortOptions } from '@enigmatry/entry-form';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { of, map } from 'rxjs';

@Component({
    selector: 'app-select-example',
    templateUrl: './select-example.component.html',
    standalone: false
})
export class SelectExampleComponent {
  readonly typeOptions = [
    { value: 0, displayName: `Food` },
    { value: 1, displayName: `Drink` },
    { value: 2, displayName: `Book` },
    { value: 3, displayName: `Car` }
  ];

  readonly groupedTypeOptions = [
    { value: 0, displayName: `Food`, category: `Consumables` },
    { value: 1, displayName: `Drink`, category: `Consumables` },
    { value: 2, displayName: `Book`, category: `Goods` },
    { value: 3, displayName: `Car`, category: `Goods` }
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
    }
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
    }
  ];

  groupedSingle: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'select',
      className: `entry-type-field entry-select`,
      templateOptions: {
        label: `Grouped single`,
        placeholder: `Grouped single`,
        description: ``,
        options: of(this.groupedTypeOptions).pipe(map(opts => sortOptions(opts, 'value', 'displayName', undefined, 'category'))),
        valueProp: 'value',
        labelProp: 'displayName',
        groupProp: 'category'
      }
    }
  ];

  groupedMulti: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'select',
      className: `entry-type-field entry-select`,
      templateOptions: {
        label: `Grouped multi`,
        placeholder: `Grouped multi`,
        description: ``,
        options: of(this.groupedTypeOptions).pipe(map(opts => sortOptions(opts, 'value', 'displayName', undefined, 'category'))),
        valueProp: 'value',
        labelProp: 'displayName',
        groupProp: 'category',
        multiple: true
      }
    }
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
    }
  ];

  groupedAutocomplete: FormlyFieldConfig[] = [
    {
      key: 'type',
      type: 'autocomplete',
      className: `entry-type-field entry-autocomplete`,
      templateOptions: {
        label: `Grouped autocomplete`,
        placeholder: `Grouped autocomplete`,
        description: ``,
        options: of(this.groupedTypeOptions).pipe(map(opts => sortOptions(opts, 'value', 'displayName', undefined, 'category'))),
        valueProp: 'value',
        labelProp: 'displayName',
        groupProp: 'category'
      }
    }
  ];
}
