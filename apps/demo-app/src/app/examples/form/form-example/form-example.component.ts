/* eslint-disable max-len */
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      className: `entry-name-field entry-input`,
      templateOptions: {
        label: `Name`,
        placeholder: `Unique product name`,
        description: ``,
        required: true,
        maxLength: 50
      }
    },
    {
      key: 'type',
      type: 'autocomplete',
      className: `entry-type-field entry-autocomplete`,
      templateOptions: {
        label: `Type`,
        placeholder: `Type`,
        description: ``,
        options: [{ value: 0, displayName: `Food` }, { value: 1, displayName: `Drink` }, { value: 2, displayName: `Book` }, { value: 3, displayName: `Car` }],
        valueProp: 'value',
        labelProp: 'displayName',
        required: true
      },
    },
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
      },
    },
    {
      key: 'amount',
      type: 'input',
      className: `entry-amount-field entry-input`,
      templateOptions: {
        label: `Amount`,
        placeholder: `Amount`,
        description: ``,
        required: true,
        type: 'number',
      },
    },
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
    {
      key: 'freeShipping',
      type: 'checkbox',
      className: `entry-free-shipping-field entry-checkbox`,
      templateOptions: {
        label: `Free shipping`,
        placeholder: `Free shipping`,
        description: ``,
        typeFormatDef: { name: 'boolean' }
      },
    }
  ];

  constructor() { }
}
